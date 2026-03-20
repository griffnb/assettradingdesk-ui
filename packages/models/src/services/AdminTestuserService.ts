// @ts-nocheck - Auto-generated service file
import { ServerService } from "@/common_lib/services/ServerService";
import { MockableService } from "../mocks/MockableService";
import type {
  RequestPostAdminTestUser,
  ResponsePostAdminTestUser
} from "../openapi/types.gen";

/**
 * AdminTestuserService
 * Auto-generated service for AdminTestuser endpoints
 */
class AdminTestuserServiceClass extends MockableService<AdminTestuserServiceClass> {
  constructor() {
    super();
    this.wrapMethods(this);
  }
  /**
   * List accounts
   * [POST]: "/admin/testUser"
   * @link {go}/internal/controllers/accounts/admin.go:34 (adminTestCreate)
   */
  postAdminTestUser(query: RequestPostAdminTestUser['query']): Promise<ResponsePostAdminTestUser['200']> {
    return ServerService.callPost("testUser", ``, {}, (query ? query : {}) as any) as Promise<ResponsePostAdminTestUser['200']>;
  }
}

export const AdminTestuserService = new AdminTestuserServiceClass();
