import { getPublicEnvVar } from "@/utils/env";
import { action, makeAutoObservable } from "mobx";

import { ServerService } from "./ServerService";
import { SessionService } from "./SessionService";

const IS_SERVER_SIDE = typeof window === "undefined";

class LoginServiceClass {
  private static instance: LoginServiceClass;
  sessionKey = getPublicEnvVar("PUBLIC_SESSION_KEY");

  redirecting: boolean = false;

  private constructor() {
    // Initialize your properties here
    makeAutoObservable(this, {
      loginEmailPassword: action,
    });
  }

  public static getInstance(): LoginServiceClass {
    if (!LoginServiceClass.instance) {
      LoginServiceClass.instance = new LoginServiceClass();
    }

    return LoginServiceClass.instance;
  }

  async loginEmailPassword(email: string, password: string, tfa_code?: string) {
    this.redirecting = false;

    const result = await ServerService.postRaw("/login", {
      email: email,
      password: password,
      tfa_code: tfa_code,
    });

    if (result && result.data && result.data.token) {
      SessionService.setSessionToken(result.data.token);
      return result;
    }

    return result;
  }

  async invalidate(customRedirect?: string) {
    if (!IS_SERVER_SIDE) {
      await ServerService.postRaw("/logout", {
        token: SessionService.sessionToken,
      });

      if (!this.redirecting) {
        window.document.location.href = customRedirect
          ? customRedirect
          : "/login";
        this.redirecting = true;
      }
    }
    SessionService.clearSessionToken();
  }

  async reValidate() {
    /*
    if (this.auth0) {
      const token = await this.auth0.getTokenSilently();
      await this.server.rawGet("/oauth/tokenLogin", { token: token });
    }
    */
  }
}

// Export the single instance
export const LoginService = LoginServiceClass.getInstance();
