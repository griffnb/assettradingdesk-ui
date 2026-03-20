import { $yieldAwait } from "@/common_lib/mobx/helpers";
import {
  IJSONAPIType,
  ServerService,
} from "@/common_lib/services/ServerService";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import { AuthService } from "@/models/services/AuthService";
import { flow, makeAutoObservable } from "mobx";
import { type AuthStore } from "./AuthStore";
import { authError } from "./helpers";
import { InitiateResponse, VerifyResponse } from "./types";

/**
 * Handles all passkey (WebAuthn) authentication functionality
 * Separated from AuthStore to keep concerns organized
 */
export class PasskeyManager {
  available: boolean = false;
  private authStore: AuthStore; // Reference to parent AuthStore

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  /**
   * Detects if passkeys (WebAuthn) are supported by the browser
   */
  get detectSupport() {
    try {
      return (
        window?.PublicKeyCredential !== undefined &&
        typeof window.PublicKeyCredential === "function"
      );
    } catch (error) {
      console.error("Failed to detect passkey support:", error);
      return false;
    }
  }

  /**
   * Initiates passkey registration process
   * @param deviceName Optional friendly name for this passkey (e.g., "iPhone 13", "MacBook Pro")
   */
  setup = async () => {
    this.authStore.setMethod(AuthenticationType.PASSKEY);
    this.authStore.setIdentifier("passkey");
    const initiateResp = await this.authStore.initiateRegistration();

    if (!initiateResp.success || !initiateResp.data) {
      return initiateResp;
    }

    const { challenge_id, challenge_data } = initiateResp.data.auth_challenge;
    if (!challenge_data) {
      return {
        error: "No challenge data returned from server",
        success: false,
        data: undefined,
      };
    }

    // Prepare WebAuthn options from server's challenge
    // Backend returns { publicKey: {...} } structure
    const options = this.prepareRegistrationOptions(
      challenge_data.public_key_creation,
    );

    let credential: PublicKeyCredential;

    try {
      credential = (await navigator.credentials.create({
        publicKey: options,
      })) as PublicKeyCredential;
    } catch (error) {
      console.error("Passkey creation failed:", error);
      return {
        error: "Passkey creation failed",
        success: false,
        data: undefined,
      };
    }

    if (!credential) {
      return {
        error: "No credential returned",
        success: false,
        data: undefined,
      };
    }

    const verifyResp = await this.authStore.verifyRegistration({
      challenge_id: challenge_id,
      type: AuthenticationType.PASSKEY,
      response: this.serializeCredentialForRegistration(credential),
    });

    return verifyResp;
  };

  /**
   * Authenticates using a passkey (discoverable credentials)
   * Uses 2-step challenge-response flow:
   * 1. Get challenge from server (no identifier needed - discoverable!)
   * 2. Sign challenge with passkey and verify
   * The userHandle in the response tells the server which user is authenticating
   */
  verifyPasskey = flow(function* (this: PasskeyManager) {
    // Step 1: Get challenge from server
    // For discoverable credentials, we don't need to provide an identifier

    //const initiateResp = yield* $yieldAwait(
    //  ServerService.callPost("auth", "discover", {}),
    //);

    if (!this.authStore.selectedMethod) {
      return authError<VerifyResponse>("authentication method not set");
    }

    // Step 1: send password initiation request to server
    const initiateResp = yield* $yieldAwait(
      this.authStore.sendInitiateAuthentication({
        type: this.authStore.selectedMethod,
        remember_me: this.authStore.remember_me,
      }),
    );

    if (!initiateResp.success || !initiateResp.data) {
      return initiateResp;
    }

    const { challenge_id, challenge_data } = initiateResp.data;

    // Prepare WebAuthn options from server's challenge
    // Backend returns { publicKey: {...} } structure
    const options = this.prepareAuthenticationOptions(
      challenge_data.public_key_options.publicKey,
    );

    let credential: PublicKeyCredential;

    try {
      // Step 2: Get credential from authenticator
      credential = (yield navigator.credentials.get({
        publicKey: options,
        mediation: "optional",
      })) as PublicKeyCredential;
    } catch (error) {
      console.error("Passkey creation failed:", error);
      return authError<VerifyResponse>(
        "Passkey authentication failed, please try again",
      );
    }
    if (!credential) {
      return authError<VerifyResponse>(
        "Passkey authentication failed, please try again",
      );
    }

    const response = credential.response as AuthenticatorAssertionResponse;

    // Step 3: Send credential to server for verification
    const verifyResp = yield* $yieldAwait(
      this.authStore.sendVerifyAuthentication({
        remember_me: this.authStore.remember_me,
        challenge_id: challenge_id,
        type: AuthenticationType.PASSKEY,
        credential_id: credential.id,
        authenticator_data: this.bufferToBase64(response.authenticatorData),
        client_data_json: this.bufferToBase64(response.clientDataJSON),
        signature: this.bufferToBase64(response.signature),
        user_handle: response.userHandle
          ? this.bufferToBase64(response.userHandle)
          : "",
      }),
    );

    return verifyResp;
  });

  verifyTwoFAPasskey = flow(function* (
    this: PasskeyManager,
    authMethodId: string,
  ) {
    // Step 1: Get challenge from server
    // For discoverable credentials, we don't need to provide an identifier

    //const initiateResp = yield* $yieldAwait(
    //  ServerService.callPost("auth", "discover", {}),
    //);

    if (authMethodId == null || authMethodId === "") {
      return authError<VerifyResponse>("authentication method not set");
    }

    // Step 1: send password initiation request to server
    const initiateResp = yield* $yieldAwait(
      AuthService.postAuth2FaInitiate({
        authentication_method_id: authMethodId,
      }) as Promise<IJSONAPIType<InitiateResponse>>,
    );

    if (!initiateResp.success || !initiateResp.data) {
      return initiateResp;
    }

    const { challenge_id, challenge_data } = initiateResp.data;

    // Prepare WebAuthn options from server's challenge
    // Backend returns { publicKey: {...} } structure
    const options = this.prepareAuthenticationOptions(
      challenge_data.public_key_options.publicKey,
    );

    let credential: PublicKeyCredential;

    try {
      // Step 2: Get credential from authenticator
      credential = (yield navigator.credentials.get({
        publicKey: options,
        mediation: "optional",
      })) as PublicKeyCredential;
    } catch (error) {
      console.error("Passkey creation failed:", error);
      return authError<VerifyResponse>(
        "Passkey authentication failed, please try again",
      );
    }
    if (!credential) {
      return authError<VerifyResponse>(
        "Passkey authentication failed, please try again",
      );
    }

    const response = credential.response as AuthenticatorAssertionResponse;

    // Step 3: Send credential to server for verification
    const verifyResp = yield* $yieldAwait(
      ServerService.callPost("auth", "2fa/verify", {
        challenge_id: challenge_id,
        type: AuthenticationType.PASSKEY,
        credential_id: credential.id,
        authenticator_data: this.bufferToBase64(response.authenticatorData),
        client_data_json: this.bufferToBase64(response.clientDataJSON),
        signature: this.bufferToBase64(response.signature),
        user_handle: response.userHandle
          ? this.bufferToBase64(response.userHandle)
          : "",
      }) as Promise<IJSONAPIType<VerifyResponse>>,
    );

    return verifyResp;
  });

  private prepareRegistrationOptions = (
    options: PublicKeyCredentialCreationOptions,
  ): PublicKeyCredentialCreationOptions => {
    if (!options) {
      throw new Error("Options is undefined");
    }

    if (!options.challenge) {
      throw new Error("Challenge is undefined in options");
    }

    if (!options.user || !options.user.id) {
      throw new Error("User or user.id is undefined in options");
    }

    return {
      ...options,
      challenge: this.convertToBuffer(options.challenge),
      user: {
        ...options.user,
        id: this.convertToBuffer(options.user.id),
      },
      excludeCredentials: options.excludeCredentials?.map(
        (cred: PublicKeyCredentialDescriptor) => ({
          ...cred,
          id: this.convertToBuffer(cred.id),
        }),
      ),
    };
  };

  private serializeCredentialForRegistration = (
    credential: PublicKeyCredential,
  ) => {
    const response = credential.response as AuthenticatorAttestationResponse;

    return {
      id: credential.id,
      rawId: this.bufferToBase64(credential.rawId),
      type: credential.type,
      authenticatorAttachment: credential.authenticatorAttachment, // "platform" | "cross-platform" | undefined
      response: {
        clientDataJSON: this.bufferToBase64(response.clientDataJSON),
        attestationObject: this.bufferToBase64(response.attestationObject),
        transports: response.getTransports?.() || [], // ["internal"] | ["usb", "nfc"] | etc
      },
    };
  };

  private prepareAuthenticationOptions = (
    options: PublicKeyCredentialRequestOptions,
  ): PublicKeyCredentialRequestOptions => {
    return {
      ...options,
      challenge: this.convertToBuffer(options.challenge),
      allowCredentials: options.allowCredentials?.map((cred) => ({
        ...cred,
        id: this.convertToBuffer(cred.id),
      })),
    };
  };

  /**
   * Converts various buffer formats to ArrayBuffer
   * Handles: base64url string, base64 string, number array, Uint8Array, ArrayBuffer
   */
  private convertToBuffer = (data: unknown): ArrayBuffer => {
    // Already an ArrayBuffer
    if (data instanceof ArrayBuffer) {
      return data;
    }

    // Already a Uint8Array - slice to get clean buffer
    if (data instanceof Uint8Array) {
      return data.slice().buffer;
    }

    // Array of numbers (JSON serialized byte array)
    if (Array.isArray(data)) {
      return new Uint8Array(data).buffer;
    }

    // Base64/Base64url string
    if (typeof data === "string") {
      return this.base64ToBuffer(data);
    }

    throw new Error(
      `Unsupported buffer format: ${typeof data}, value: ${JSON.stringify(data)}`,
    );
  };

  private base64ToBuffer = (base64: string): ArrayBuffer => {
    const binary = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  private bufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i] as number);
    }
    // Return base64url (RFC 4648 Section 5) as required by WebAuthn
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };
}
