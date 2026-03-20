import { $yieldAwait } from "@/common_lib/mobx/helpers";
import { flow, makeAutoObservable } from "mobx";
import { type AuthStore } from "./AuthStore";
import { authError } from "./helpers";
import { InitiateResponse } from "./types";

/**
 * Handles all OAuth authentication functionality
 * Separated from AuthStore to keep concerns organized
 */
export class OauthManager {
  private authStore: AuthStore; // Reference to parent AuthStore

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  /**
   * Connects OAuth provider to user account
   * Opens OAuth flow in popup window and handles callback
   */
  /*
  setup = flow(function* (this: OauthManager, provider: "google") {
    // Step 1: Get OAuth URL from backend
    const urlResp = yield* $yieldAwait(AccountService.getExtAuthURL("web"));

    if (!urlResp.success || !urlResp.data) {
      return authError<AuthenticationMethodModel>(
        urlResp.error || "Failed to get OAuth URL",
      );
    }

    const oauthUrl = urlResp.data.url;

    // Step 2: Open OAuth popup window
    const popup = window.open(
      oauthUrl,
      "OAuth Authentication",
      "width=500,height=600,left=100,top=100",
    );

    if (!popup) {
      return authError<AuthenticationMethodModel>(
        "Failed to open OAuth popup. Please allow popups for this site.",
      );
    }

    // Step 3: Wait for OAuth callback
    const result = yield* $yieldAwait(
      new Promise<IJSONAPIType<{ token: string; email: string }>>((resolve) => {
        const messageHandler = (event: MessageEvent) => {
          // Validate origin for security
          if (event.origin !== window.location.origin) {
            return;
          }

          if (event.data.type === "oauth_success") {
            window.removeEventListener("message", messageHandler);
            popup?.close();
            resolve({
              success: true,
              data: {
                token: event.data.token,
                email: event.data.email,
              },
              error: "",
              statusCode: 200,
            });
          } else if (event.data.type === "oauth_error") {
            window.removeEventListener("message", messageHandler);
            popup?.close();
            resolve({
              success: false,
              error: event.data.error || "OAuth authentication failed",
              data: undefined,
              statusCode: 400,
            });
          }
        };

        window.addEventListener("message", messageHandler);

        // Check if popup was closed
        const checkClosed = setInterval(() => {
          if (popup?.closed) {
            clearInterval(checkClosed);
            window.removeEventListener("message", messageHandler);
            resolve({
              success: false,
              error: "OAuth popup was closed",
              data: undefined,
              statusCode: 400,
            });
          }
        }, 1000);
      }),
    );

    if (!result.success || !result.data) {
      return result as IJSONAPIType<AuthenticationMethodModel>;
    }

    // Step 4: Register OAuth with backend
    const registrationResp = yield* $yieldAwait(
      ServerService.callPost("auth", "registration", {
        type: AuthenticationType.OAUTH,
        identifier: result.data.email,
        oauth_provider: provider,
        token: result.data.token,
      }) as Promise<IJSONAPIType<RegistrationResponse>>,
    );

    if (!registrationResp.success || !registrationResp.data) {
      return authError<AuthenticationMethodModel>(
        registrationResp.error || "Failed to register OAuth",
      );
    }

    // OAuth is immediately verified, no need for verification step
    return {
      success: true,
      data: registrationResp.data as unknown as AuthenticationMethodModel,
    } as IJSONAPIType<AuthenticationMethodModel>;
  });

  */

  /**
   * Authenticates with OAuth for specific identifier
   * Uses 2-step challenge-response flow:
   * 1. Send OAuth initiation request to server
   * 2. If 2FA is required, handle that separately in the OTP Manager
   */
  sendOAuth = flow(function* (this: OauthManager) {
    if (!this.authStore.selectedMethod) {
      return authError<InitiateResponse>("authentication method not set");
    }
    if (!this.authStore.token || this.authStore.token === "") {
      return authError<InitiateResponse>("OAuth token not set");
    }

    // Step 1: send OAuth initiation request to server
    const initiateResp = yield* $yieldAwait(
      this.authStore.sendInitiateAuthentication({
        type: this.authStore.selectedMethod,
        oauth_provider: this.authStore.oauthProvider,
        token: this.authStore.token || "",
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
}
