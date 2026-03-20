import { $yieldAwait } from "@/common_lib/mobx/helpers";
import { flow, makeAutoObservable } from "mobx";
import { type AuthStore } from "./AuthStore";
import { authError } from "./helpers";
import { InitiateResponse, VerifyResponse } from "./types";

/**
 * Handles all OTP (One-Time Password) authentication functionality
 * Separated from AuthStore to keep concerns organized
 */
export class OTPManager {
  private authStore: AuthStore; // Reference to parent AuthStore

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  /**
   * Authenticates with OTP for specific identifier
   * Uses 2-step challenge-response flow:
   * 1. Send OTP initiation request to server
   * 2. Verify OTP and complete authentication
   */
  initiateOTP = flow(function* (this: OTPManager) {
    if (!this.authStore.identifier || this.authStore.identifier === "") {
      return authError<InitiateResponse>("identifier not set");
    }
    if (!this.authStore.selectedMethod) {
      return authError<InitiateResponse>("authentication method not set");
    }

    // Step 1: send OTP initiation request to server
    const initiateResp = yield* $yieldAwait(
      this.authStore.sendInitiateAuthentication({
        type: this.authStore.selectedMethod,
        identifier: this.authStore.identifier,
        remember_me: this.authStore.remember_me,
      }),
    );

    if (!initiateResp.success || !initiateResp.data) {
      return initiateResp;
    }

    this.authStore.challengeId = initiateResp.data.challenge_id;
    this.authStore.expiresAt = initiateResp.data.expires_at;

    return initiateResp;
  });

  /**
   * Authenticates using an OTP (One-Time Password)
   * Uses 2-step challenge-response flow:
   * 1. Send OTP initiation request to server
   * 2. Verify OTP and complete authentication
   */
  authenticateOTP = flow(function* (this: OTPManager) {
    if (!this.authStore.challengeId || !this.authStore.selectedMethod) {
      return authError<VerifyResponse>("challengeId or selectedMethod not set");
    }

    // Step 3: Send credential to server for verification
    const verifyResp = yield* $yieldAwait(
      this.authStore.sendVerifyAuthentication({
        challenge_id: this.authStore.challengeId || "",
        type: this.authStore.selectedMethod, // AuthenticationType.PASSKEY
        code: this.authStore.otp || "",
        remember_me: this.authStore.remember_me,
      }),
    );

    return verifyResp;
  });
}
