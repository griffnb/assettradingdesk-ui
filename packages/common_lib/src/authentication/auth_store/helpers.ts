import { IJSONAPIType } from "@/common_lib/services/ServerService";
import { debugLog } from "@/utils/debug";

export const authError = <T>(message: string) => {
  debugLog("Auth Error:", message);
  return Promise.resolve({
    error: message,
    success: false,
    data: undefined,
    statusCode: 400,
  } as IJSONAPIType<T>);
};
