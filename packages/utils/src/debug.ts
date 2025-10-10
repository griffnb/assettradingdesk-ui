import { getCookie } from "./cookies";
import { getPublicEnvVar } from "./env";
export function debugLog(...args: unknown[]): void {
  // If not production, debug, if an admin, debug .
  if (
    getPublicEnvVar("PUBLIC_ENVIRONMENT") !== "production" ||
    getCookie("admin_token")
  ) {
    console.log(...args);
  }
}
