import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AdminModel } from "@/models/models/admin/model/AdminModel";
import { Store } from "@/models/store/Store";
import { getPublicEnvVar } from "@/utils/env";
import { action, flow, makeAutoObservable } from "mobx";

const IS_SERVER_SIDE = typeof window === "undefined";

class SessionServiceClass {
  private static instance: SessionServiceClass;
  sessionKey = getPublicEnvVar("PUBLIC_SESSION_KEY");
  sessionToken = "";
  tokenFetch: (() => Promise<string | null>) | null = null;
  redirectLocation: string | null = null;

  account: AccountModel | null = null;
  admin: AdminModel | null = null;
  loadTime: number = 0;

  private constructor() {
    // Initialize your properties here
    makeAutoObservable(this, {
      clearSessionToken: action,
      setSessionToken: action,
    });
    if (!IS_SERVER_SIDE) {
      this.sessionToken = this.storedToken;
    }
  }

  setRedirectLocation(location: string | null) {
    this.redirectLocation = location;
  }

  setSessionToken(token: string) {
    if (!IS_SERVER_SIDE) {
      this.sessionToken = token;
      localStorage.setItem(this.sessionKey, token);
      this.setCookie(this.sessionKey, token, 365);
    }
  }

  clearSessionToken(redirectLocation?: string) {
    if (!IS_SERVER_SIDE) {
      this.sessionToken = "";
      localStorage.removeItem(this.sessionKey);
      this.setCookie(this.sessionKey, "", 0);
    }
    if (redirectLocation) {
      this.redirectLocation = redirectLocation;
    }
  }

  clearUser() {
    this.account = null;
    this.admin = null;
  }

  public static getInstance(): SessionServiceClass {
    if (!SessionServiceClass.instance) {
      SessionServiceClass.instance = new SessionServiceClass();
    }

    return SessionServiceClass.instance;
  }

  get isAuthenticated(): boolean {
    return this.sessionToken !== "";
  }

  get storedToken(): string {
    if (!IS_SERVER_SIDE) {
      const localToken = localStorage.getItem(this.sessionKey);
      if (localToken) {
        return localToken;
      }

      return this.getCookie(this.sessionKey);
    }
    return "";
  }

  getCookie(cname: string) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c !== undefined) {
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
    }
    return "";
  }

  setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();

    const hostname = window.location.hostname;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    const domain = isLocalhost
      ? ""
      : `;domain=.${hostname.split(".").slice(-2).join(".")}`;
    const secure = window.location.protocol === "https:" ? ";Secure" : "";

    document.cookie = `${cname}=${cvalue};${expires};path=/${domain};SameSite=Lax${secure}`;
  }

  reloadAccount() {
    return this.loadAccount(true);
  }

  async fetchAccount(): Promise<AccountModel | null> {
    const loadedAccount = this.account;
    if (loadedAccount) {
      return loadedAccount;
    }

    return this.loadAccount();
  }

  loadAdmin = flow(function* (this: SessionServiceClass, skipCache?: boolean) {
    const response = yield Store.admin.queryRecord(
      "me",
      {},
      { skipCache: skipCache, silentError: true },
    );
    if (response.success && response.data) {
      this.admin = response.data as AdminModel;

      return this.admin;
    }
    return null;
  });

  async fetchAdmin(): Promise<AdminModel | null> {
    const loadedAdmin = this.admin;
    if (loadedAdmin) {
      return loadedAdmin;
    }

    return this.loadAdmin();
  }

  loadAccount = flow(function* (
    this: SessionServiceClass,
    skipCache?: boolean,
  ) {
    const response = yield Store.account.queryRecord(
      "me",
      {},
      {
        skipCache: skipCache,
        silentError: true,
      },
    );
    if (response.success && response.data) {
      this.account = response.data as AccountModel;
      this.loadTime = Date.now();

      return this.account;
    }
    return null;
  });
}

// Export the single instance
export const SessionService = SessionServiceClass.getInstance();
