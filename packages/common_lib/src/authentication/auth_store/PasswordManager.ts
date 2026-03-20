import { $yieldAwait } from "@/common_lib/mobx/helpers";
import {
  IJSONAPIType,
  ServerService,
} from "@/common_lib/services/ServerService";
import { AuthenticationMethodModel } from "@/models/models/authentication_method/model/AuthenticationMethodModel";
import { flow, makeAutoObservable } from "mobx";
import { type AuthStore } from "./AuthStore";
import { authError } from "./helpers";
import { InitiateResponse } from "./types";

/**
 * Handles all password authentication functionality
 * Separated from AuthStore to keep concerns organized
 */
export class PasswordManager {
  private authStore: AuthStore; // Reference to parent AuthStore

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  /**
   * Authenticates with password for specific identifier
   * Uses 2-step challenge-response flow:
   * 1. Send password initiation request to server
   * 2. If 2FA is required, handle that separately in the OTP Manager
   */
  sendPassword = flow(function* (this: PasswordManager) {
    if (
      !this.authStore.identifier ||
      this.authStore.identifier === "" ||
      !this.authStore.password ||
      this.authStore.password === ""
    ) {
      return authError<InitiateResponse>("identifier or password not set");
    }
    if (!this.authStore.selectedMethod) {
      return authError<InitiateResponse>("authentication method not set");
    }

    // Step 1: send password initiation request to server
    const initiateResp = yield* $yieldAwait(
      this.authStore.sendInitiateAuthentication({
        type: this.authStore.selectedMethod,
        identifier: this.authStore.identifier,
        password: this.authStore.password || "",
        remember_me: this.authStore.remember_me,
      }),
    );

    if (!initiateResp.success || !initiateResp.data) {
      return initiateResp;
    }

    this.authStore.challengeId = initiateResp.data.challenge_id;
    if (initiateResp.data.two_fa_identifier) {
      this.authStore.identifier = initiateResp.data.two_fa_identifier;
      this.authStore.selectedMethod = initiateResp.data.type;
    }

    return initiateResp;
  });

  static setPassword(data: {
    password: string;
    password_confirmation: string;
  }): Promise<IJSONAPIType<AuthenticationMethodModel>> {
    return ServerService.callPost("auth", "password/set", data);
  }
}
