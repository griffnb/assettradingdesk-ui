import { $yieldAwait } from "@/common_lib/mobx/helpers";
import {
  IJSONAPIType,
  ServerService,
} from "@/common_lib/services/ServerService";
import { toE164 } from "@/common_lib/utils/phone/en_US";
import { formatPhoneNumber } from "@/common_lib/utils/strings";
import { ValidationRulesType } from "@/common_lib/utils/validations";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import { AuthenticationMethodModel } from "@/models/models/authentication_method/model/AuthenticationMethodModel";
import dayjs from "dayjs";
import { flow, makeAutoObservable } from "mobx";
import { authError } from "./helpers";
import { OauthManager } from "./OauthManager";
import { OTPManager } from "./OTPManager";
import { PasskeyManager } from "./PasskeyManager";
import { PasswordManager } from "./PasswordManager";
import {
  InitiatePayload,
  InitiateResponse,
  RegistrationResponse,
  VerifyPayload,
  VerifyResponse,
} from "./types";

/**
 * Main authentication store
 * Uses composition to keep different auth methods organized
 */
export class AuthStore {
  account: AccountModel | null = null;
  identifier: string | null = null;

  token: string | null = null;
  oauthProvider: "google" | "njea" = "google";
  otp: string | null = null;
  password: string | null = null;

  challengeId: string | null = null;

  expiresAt: number | null = null;

  selectedMethod: AuthenticationType | null = null;

  twoFAValidatedAt: number | null = null;

  // Passkey functionality in separate manager
  passkeyManager: PasskeyManager;
  otpManager: OTPManager;
  passwordManager: PasswordManager;
  oauthManager: OauthManager;

  remember_me: boolean = false;

  constructor(options?: Partial<AuthStore>) {
    Object.assign(this, options);
    this.passkeyManager = new PasskeyManager(this);
    this.otpManager = new OTPManager(this);
    this.passwordManager = new PasswordManager(this);
    this.oauthManager = new OauthManager(this);
    makeAutoObservable(this);
  }

  setAccount = (account: AccountModel) => {
    this.account = account;
  };

  setIdentifier = (identifier: string) => {
    this.identifier = identifier.toLowerCase().trim();
  };

  get formattedIdentifier() {
    if (this.identifier && !this.identifier?.includes("@")) {
      const digits = toE164(this.identifier);
      const phone = digits.replace("+1", "");
      return formatPhoneNumber(phone, "+1 (xxx) xxx-xxxx");
    }

    return this.identifier || "";
  }

  setToken = (token: string) => {
    this.token = token;
  };

  setOAuthProvider = (provider: "google" | "njea") => {
    this.oauthProvider = provider;
  };

  setMethod = (method: AuthenticationType) => {
    this.selectedMethod = method;
  };

  setOTP = (otp: string) => {
    this.otp = otp;
  };

  initiateTwoFA = flow(function* (this: AuthStore, methodId: string) {
    if (this.selectedMethod == AuthenticationType.PASSKEY) {
      return this.passkeyManager.verifyTwoFAPasskey(methodId);
    }

    const resp = yield* $yieldAwait(
      ServerService.callPost("auth", "2fa/initiate", {
        authentication_method_id: methodId,
      }) as Promise<IJSONAPIType<InitiateResponse>>,
    );
    if (resp.success && resp.data) {
      this.challengeId = resp.data.challenge_id;
      this.expiresAt = resp.data.expires_at;
      this.identifier = resp.data.two_fa_identifier || null;
    }
    return resp;
  });

  verifyTwoFA = flow(function* (this: AuthStore) {
    if (!this.selectedMethod) {
      return authError<VerifyResponse>("authentication method not set");
    }

    switch (this.selectedMethod) {
      case AuthenticationType.TWO_FA_KEY:
        break;
      case AuthenticationType.TWO_FA_EMAIL:
      case AuthenticationType.TWO_FA_PHONE:
      case AuthenticationType.SMS_OTP:
      case AuthenticationType.EMAIL_OTP:
        if (!this.identifier || this.identifier === "") {
          return authError<VerifyResponse>("identifier not set");
        }
        break;
      default:
        return authError<VerifyResponse>(
          "Unsupported authentication method for initiation",
        );
    }

    const resp = yield* $yieldAwait(
      ServerService.callPost("auth", "2fa/verify", {
        challenge_id: this.challengeId || "",
        type: this.selectedMethod, // AuthenticationType.PASSKEY
        code: this.otp || "",
      }) as Promise<IJSONAPIType<VerifyResponse>>,
    );

    return resp;
  });

  checkTwoFAValidated = flow(function* (this: AuthStore) {
    if (this.twoFAValidated) {
      return true;
    }

    const resp = yield* $yieldAwait(
      ServerService.callPost("auth", "2fa/validated", {}) as Promise<
        IJSONAPIType<boolean>
      >,
    );
    if (resp.success && resp.data) {
      this.twoFAValidatedAt = dayjs().unix();
      return resp.data;
    }
    return false;
  });

  get twoFAValidated() {
    if (this.twoFAValidatedAt) {
      const minTime = dayjs().subtract(10, "minute").unix();
      return this.twoFAValidatedAt >= minTime;
    }
    return false;
  }

  initiateAuthentication = flow(function* (this: AuthStore) {
    if (!this.selectedMethod) {
      return authError<InitiateResponse>("authentication method not set");
    }

    switch (this.selectedMethod) {
      case AuthenticationType.PASSWORD:
        return yield* $yieldAwait(this.passwordManager.sendPassword());
      case AuthenticationType.PASSKEY:
        return yield* $yieldAwait(this.passkeyManager.verifyPasskey());
      case AuthenticationType.OAUTH:
        return yield* $yieldAwait(this.oauthManager.sendOAuth());
      case AuthenticationType.SMS_OTP:
      case AuthenticationType.EMAIL_OTP:
        if (!this.identifier || this.identifier === "") {
          return authError<InitiateResponse>("identifier not set");
        }
        return yield* $yieldAwait(this.otpManager.initiateOTP());
      default:
        return authError<InitiateResponse>(
          "Unsupported authentication method for initiation",
        );
    }
  }) as () => Promise<IJSONAPIType<InitiateResponse | VerifyResponse>>;

  verifyAuthentication = flow(function* (this: AuthStore) {
    if (!this.selectedMethod) {
      return authError<VerifyResponse>("authentication method not set");
    }

    switch (this.selectedMethod) {
      case AuthenticationType.SMS_OTP:
      case AuthenticationType.EMAIL_OTP:
      case AuthenticationType.TWO_FA_KEY:
      case AuthenticationType.TWO_FA_PHONE:
        if (!this.identifier || this.identifier === "") {
          return authError<VerifyResponse>("identifier not set");
        }
        return yield* $yieldAwait(this.otpManager.authenticateOTP());
      default:
        return authError<VerifyResponse>(
          "Unsupported authentication method for initiation",
        );
    }
  }) as () => Promise<IJSONAPIType<VerifyResponse>>;

  getMethods = () => {
    return ServerService.callPost("auth", "methods", {
      identifier: this.identifier,
    }) as Promise<
      IJSONAPIType<{ methods: AuthenticationType[]; not_setup: boolean }>
    >;
  };

  sendInitiateAuthentication = (payload: InitiatePayload) => {
    return ServerService.callPost("auth", "initiate", payload) as Promise<
      IJSONAPIType<InitiateResponse>
    >;
  };

  sendVerifyAuthentication = (payload: VerifyPayload) => {
    return ServerService.callPost("auth", "verify", payload) as Promise<
      IJSONAPIType<VerifyResponse>
    >;
  };

  tryValidation = false;
  validationRules: ValidationRulesType<AuthStore> = {
    identifier: {
      required: { message: "Email or phone is required." },
    },
  };

  initiateRegistration = () => {
    if (!this.identifier || this.identifier === "") {
      return authError<RegistrationResponse>("identifier not set");
    }
    if (!this.selectedMethod) {
      return authError<RegistrationResponse>("authentication method not set");
    }

    // Step 1: send OTP initiation request to server
    return ServerService.callPost("auth", "registration", {
      type: this.selectedMethod,
      identifier: this.identifier,
    }) as Promise<IJSONAPIType<RegistrationResponse>>;
  };

  verifyRegistration = (optionalPayload?: Partial<VerifyPayload>) => {
    if (!this.selectedMethod) {
      return authError<AuthenticationMethodModel>(
        "authentication method not set",
      );
    }

    const payload: VerifyPayload = {
      challenge_id: this.challengeId || "",
      type: this.selectedMethod,
      code: this.otp || "",
    };

    Object.assign(payload, optionalPayload);

    // Step 1: send OTP initiation request to server

    return ServerService.callPost(
      "auth",
      "registration/verify",
      payload,
    ) as Promise<IJSONAPIType<AuthenticationMethodModel>>;
  };

  static enableTwoFA() {
    return ServerService.callPost("auth", "2fa/enable", {}) as Promise<
      IJSONAPIType<boolean>
    >;
  }

  static disableTwoFA() {
    return ServerService.callPost("auth", "2fa/disable", {}) as Promise<
      IJSONAPIType<boolean>
    >;
  }

  static removeAuthentication(id: string) {
    return ServerService.callDelete("auth", `registration/${id}`) as Promise<
      IJSONAPIType<boolean>
    >;
  }

  /*
  static checkKey(resetKey: string) {
    return ServerService.callGet("auth", "checkKey", {
      key: resetKey,
    }) as Promise<IJSONAPIType<{ valid: boolean }>>;
  }

  static resetPassword(resetPassword: {
    resetKey: string;

    password: string;
    password_confirmation: string;
  }) {
    return ServerService.callPost("auth", "resetPassword", {
      resetKey: resetPassword.resetKey,
      password_confirmation: resetPassword.password_confirmation,
      password: resetPassword.password,
    });
  }

  static sendResetPassword(email: string, token: string) {
    return ServerService.callPost("auth", "sendResetPassword", {
      email: email,
      token: token,
    });
  }*/
}
