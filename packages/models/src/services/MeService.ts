// @ts-nocheck - Auto-generated service file
import { ServerService } from "@/common_lib/services/ServerService";
import { MockableService } from "../mocks/MockableService";
import type {
  RequestGetMe,
  ResponseGetMe
} from "../openapi/types.gen";

/**
 * MeService
 * Auto-generated service for Me endpoints
 */
class MeServiceClass extends MockableService<MeServiceClass> {
  constructor() {
    super();
    this.wrapMethods(this);
  }
  /**
   * Get Current Account
   * [GET]: "/me"
   * @link {go}/internal/controllers/accounts/auth.go:29 (authMe)
   */
  getMe(): Promise<ResponseGetMe['200']> {
    return ServerService.callGet("me", ``, {}) as Promise<ResponseGetMe['200']>;
  }
}

export const MeService = new MeServiceClass();
