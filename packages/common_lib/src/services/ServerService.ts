import { getPublicEnvVar } from "@/utils/env";
import { getUrlString, hashPayload } from "@/utils/strings";

import { decryptResponse } from "@/utils/crypto";
import {
  EventSourceMessage,
  fetchEventSource,
  FetchEventSourceInit,
} from "@microsoft/fetch-event-source";
import { NoLeadingSlash } from "../types/helpers";
import { NotificationService } from "./NotificationService";
import { SessionService } from "./SessionService";

export interface IJSONAPI {
  success: boolean;
  data?: any;
  error: string;
}

interface Options extends RequestInit {
  notificationService?: boolean;
}

export interface FetchEventSourceHandlers {
  onopen?: (response: Response) => Promise<void>;
  onmessage?: (ev: EventSourceMessage) => void;
  onclose?: () => void;
  onerror?: (err: any) => number | null | undefined | void;
  openWhenHidden?: boolean;
  signal?: AbortSignal;
}

export type IJSONAPIType<T> = Omit<IJSONAPI, "data"> & { data?: T };

class ServerServiceClass {
  private static instance: ServerServiceClass;
  private notificationService = false;
  private constructor() {}

  public static getInstance(): ServerServiceClass {
    if (!ServerServiceClass.instance) {
      ServerServiceClass.instance = new ServerServiceClass();
    }

    return ServerServiceClass.instance;
  }

  host = getPublicEnvVar("PUBLIC_API_URL");
  sessionKey = getPublicEnvVar("PUBLIC_SESSION_KEY");
  decryptKey = getPublicEnvVar("PUBLIC_DECRYPT_KEY");
  namespace =
    getPublicEnvVar("PUBLIC_NAMESPACE") !== "" &&
    getPublicEnvVar("PUBLIC_NAMESPACE") !== "_"
      ? `${getPublicEnvVar("PUBLIC_NAMESPACE")}/`
      : "";

  // Legacy with token
  async headers(payload: object): Promise<{ [key: string]: string }> {
    const key: { [key: string]: string } = {};

    if (typeof window !== "undefined") {
      key[this.sessionKey] = SessionService.sessionToken;
      const token = await SessionService.tokenFetch?.();
      if (token) {
        key["Authorization"] = `Bearer ${token}`;
      }
      key["X-Source-Origin"] = window.location.href;
    }

    key["v"] = await hashPayload(payload);
    key["Content-Type"] = "application/json";

    return key;
  }

  async bulkUpdate(
    route: string,
    ids: string[],
    field: string,
    value: string | number,
    rawParameters: Record<string, string | string[]> = {}
  ) {
    const putBody: any = { data: {} };

    putBody.data[field] = value;
    putBody.ids = ids;

    return this.postRaw(
      `/${this.namespace}${route}/0`,
      putBody,
      "PUT",
      rawParameters
    );
  }

  async callPost<Path extends string>(
    route: string,
    path: NoLeadingSlash<Path>,
    body: Record<string, any>,
    rawParameters: Record<string, string | string[]> = {},
    options?: Options
  ) {
    return this.postRaw(
      `/${this.namespace}${route}/${path}`,
      body,
      "POST",
      rawParameters,
      options
    );
  }

  async callPut<Path extends string>(
    route: string,
    path: NoLeadingSlash<Path>,
    body: Record<string, any>,
    rawParameters: Record<string, string | string[]> = {},
    options?: Options
  ) {
    return this.postRaw(
      `/${this.namespace}${route}/${path}`,
      body,
      "PUT",
      rawParameters,
      options
    );
  }

  callGet<Path extends string>(
    route: string,
    path: NoLeadingSlash<Path>,
    rawParameters: Record<string, string | string[]> = {},
    options?: Options
  ): Promise<IJSONAPI> {
    return this.getRaw(
      `/${this.namespace}${route}/${path}`,
      rawParameters,
      "GET",
      options
    );
  }

  callDelete<Path extends string>(
    route: string,
    path: NoLeadingSlash<Path>,
    rawParameters: Record<string, string | string[]> = {},
    options?: Options
  ): Promise<IJSONAPI> {
    return this.getRaw(
      `/${this.namespace}${route}/${path}`,
      rawParameters,
      "DELETE",
      options
    );
  }

  async postRaw(
    endpoint: string,
    body: Record<string, any>,
    method = "POST",
    rawParameters: Record<string, string | string[]> = {},
    options?: Options
  ): Promise<IJSONAPI> {
    const params = getUrlString(rawParameters);
    const url = `${this.host}${endpoint}?${params.toString()}`;

    const requestOptions: RequestInit = {
      headers: await this.headers(body),
      credentials: "include",
      method: method,
      body: JSON.stringify(body),
      signal: options?.signal,
    };

    try {
      const resp = await fetchWithRetry(url, requestOptions);
      if (resp.ok) {
        const response = await resp.json();
        return decryptResponse(response, this.decryptKey);
      } else {
        return this.handleErrorResponse(resp, options);
      }
    } catch (e) {
      console.log(e);
      return { success: false, error: String(e) };
    }
  }

  async postRawForm(
    endpoint: string,
    body: FormData,
    type = "POST",
    rawParameters: Record<string, string | string[]> = {},
    options?: Options
  ): Promise<IJSONAPI> {
    const params = getUrlString(rawParameters);
    const url = `${this.host}${endpoint}?${params.toString()}`;
    const headers = await this.headers(body);

    delete headers["Content-Type"];

    const requestOptions: RequestInit = {
      headers: headers,
      credentials: "include",
      method: type,
      body: body,
      signal: options?.signal,
    };

    try {
      const resp = await fetchWithRetry(url, requestOptions);
      if (resp.ok) {
        const response = await resp.json();
        return decryptResponse(response, this.decryptKey);
      } else {
        return this.handleErrorResponse(resp, options);
      }
    } catch (e) {
      console.log(e);
      return { success: false, error: String(e) };
    }
  }

  async getRaw(
    endpoint: string,
    rawParameters: Record<string, string | string[]>,
    method = "GET",
    options?: Options
  ): Promise<IJSONAPI> {
    const params = getUrlString(rawParameters);
    const url = `${this.host}${endpoint}?${params.toString()}`;

    const requestOptions: RequestInit = {
      headers: await this.headers(rawParameters),
      credentials: "include",
      method: method,
      signal: options?.signal,
    };

    try {
      const resp = await fetchWithRetry(url, requestOptions);
      if (resp.ok) {
        const response = await resp.json();
        return decryptResponse(response, this.decryptKey);
      } else {
        return this.handleErrorResponse(resp, options);
      }
    } catch (e) {
      console.error(e);
      return { success: false, error: String(e) };
    }
  }

  async callDownload<Path extends string>(
    route: string,
    path: NoLeadingSlash<Path>,
    body: Record<string, any>,
    rawParameters: Record<string, string | string[]> = {}
  ) {
    return this.downloadRaw(
      `/${this.namespace}${route}/${path}`,
      body,
      "POST",
      rawParameters
    );
  }

  async downloadRaw(
    endpoint: string,
    body: Record<string, any>,
    method = "POST",
    rawParameters: Record<string, string | string[]> = {},
    options?: Options
  ): Promise<IJSONAPI> {
    const params = getUrlString(rawParameters);
    const url = `${this.host}${endpoint}?${params.toString()}`;

    const requestOptions: RequestInit = {
      headers: await this.headers(body),
      credentials: "include",
      method: method,
      body: JSON.stringify(body),
      signal: options?.signal,
    };

    try {
      const resp = await fetchWithRetry(url, requestOptions);
      if (resp.ok) {
        const blob = await resp.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const disposition = resp.headers.get("Content-Disposition");
        const filename = disposition
          ? getFilenameFromHeader(disposition)
          : "no_disposition";
        link.download = filename || "download_no-file";
        link.click();
        URL.revokeObjectURL(link.href);
        return { success: true, error: "" };
      } else {
        return this.handleErrorResponse(resp, options);
      }
    } catch (e) {
      console.log(e);
      return { success: false, error: String(e) };
    }
  }

  async streamPost<Path extends string>(
    route: string,
    path: NoLeadingSlash<Path>,
    body: Record<string, any>,
    handlers: FetchEventSourceHandlers,
    rawParameters: Record<string, string | string[]> = {}
  ) {
    this.postStreamRaw(
      `/${this.namespace}${route}/${path}`,
      body,
      handlers,
      "POST",
      rawParameters
    );
  }

  async streamPut<Path extends string>(
    route: string,
    path: NoLeadingSlash<Path>,
    body: Record<string, any>,
    handlers: FetchEventSourceHandlers,
    rawParameters: Record<string, string | string[]> = {}
  ) {
    this.postStreamRaw(
      `/${this.namespace}${route}/${path}`,
      body,
      handlers,
      "PUT",
      rawParameters
    );
  }

  streamGet<Path extends string>(
    route: string,
    path: NoLeadingSlash<Path>,
    rawParameters: Record<string, string | string[]> = {},
    handlers: FetchEventSourceHandlers
  ) {
    this.getStreamRaw(
      `/${this.namespace}${route}/${path}`,
      rawParameters,
      handlers
    );
  }

  async postStreamRaw(
    endpoint: string,
    body: Record<string, any>,
    handlers: FetchEventSourceHandlers,
    method = "POST",
    rawParameters: Record<string, string | string[]> = {}
  ) {
    const params = getUrlString(rawParameters);
    const url = `${this.host}${endpoint}?${params.toString()}`;

    const options: FetchEventSourceInit = {
      headers: await this.headers(body),
      credentials: "include",
      method: method,
      body: JSON.stringify(body),
      openWhenHidden: true,
      ...handlers,
    };

    fetchEventSource(url, options);
  }

  async getStreamRaw(
    endpoint: string,
    rawParameters: Record<string, string | string[]>,
    handlers: FetchEventSourceHandlers,
    method = "GET"
  ) {
    const params = getUrlString(rawParameters);
    const url = `${this.host}${endpoint}?${params.toString()}`;

    const options: FetchEventSourceInit = {
      headers: await this.headers(rawParameters),
      credentials: "include",
      method: method,
      openWhenHidden: true,
      ...handlers,
    };

    fetchEventSource(url, options);
  }

  getURL(
    route: string,
    path: NoLeadingSlash<string>,
    rawParameters: Record<string, string | string[]> = {}
  ): string {
    const params = getUrlString(rawParameters);
    return `${this.host}/${this.namespace}${route}/${path}?${params.toString()}`;
  }

  handleErrorResponse = async (
    resp: Response,
    options?: Options
  ): Promise<IJSONAPI> => {
    let notificationService = this.notificationService;

    if (options?.notificationService !== undefined) {
      notificationService = options.notificationService;
    }

    if (resp.status == 403 || resp.status == 401) {
      if (notificationService) {
        NotificationService.addError("Unauthorized");
      }
      return { success: false, error: "Unauthorized" };
    }
    if (resp.status == 404 || resp.status == 400) {
      let respData: IJSONAPI;
      try {
        respData = resp
          ? await resp.json()
          : { success: false, error: "Internal Error" };
      } catch (e) {
        console.error(e);
        respData = { success: false, error: "Internal Error" };
      }

      if (notificationService) {
        NotificationService.addError(respData?.error || "Internal Error");
      }

      return respData;
    }

    if (resp.status >= 500) {
      return { success: false, error: "Internal Error" };
    }

    const respData: IJSONAPI = await resp.json();
    if (notificationService) {
      NotificationService.addError(respData?.error || "Internal Error");
    }
    return respData;
  };
}

// Export the single instance
export const ServerService = ServerServiceClass.getInstance();

const getFilenameFromHeader = (header: string): string | null => {
  const match = /filename\*?=(?:UTF-8''|")?([^;"\n]+)/i.exec(header);
  // @ts-expect-error safe
  return match ? match[1] : null;
};

async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  backoff = 500
): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok && res.status >= 500)
        throw new Error(`Server error: ${res.status}`);
      return res;
    } catch (err: any) {
      if (i === retries) throw err;
      const jitter = Math.random() * 100;
      await new Promise((res) => setTimeout(res, backoff * 2 ** i + jitter));
    }
  }
  throw new Error("Unreachable");
}
