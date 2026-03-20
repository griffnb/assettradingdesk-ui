// @ts-nocheck - Auto-generated service file
import { ServerService } from "@/common_lib/services/ServerService";
import { MockableService } from "../mocks/MockableService";
import type {
  RequestGetAdminAccount,
  RequestGetAdminAccountById,
  RequestGetAdminAccountCount,
  RequestPostAdminAccount,
  RequestPutAdminAccountById,
  ResponseGetAdminAccount,
  ResponseGetAdminAccountById,
  ResponseGetAdminAccountCount,
  ResponsePostAdminAccount,
  ResponsePutAdminAccountById
} from "../openapi/types.gen";

/**
 * AdminAccountService
 * Auto-generated service for AdminAccount endpoints
 */
class AdminAccountServiceClass extends MockableService<AdminAccountServiceClass> {
  constructor() {
    super();
    this.wrapMethods(this);
  }
  /**
   * List Account
   * [GET]: "/admin/account"
   * @link {go}/internal/controllers/accounts/x_gen_admin.go:38 (adminIndex)
   */
  getAdminAccount(query: RequestGetAdminAccount['query']): Promise<ResponseGetAdminAccount['200']> {
    return ServerService.callGet("account", ``, (query ? query : {}) as any) as Promise<ResponseGetAdminAccount['200']>;
  }

  /**
   * Create Account
   * [POST]: "/admin/account/"
   * @link {go}/internal/controllers/accounts/x_gen_admin.go:103 (adminCreate)
   */
  postAdminAccount(body: RequestPostAdminAccount['body']): Promise<ResponsePostAdminAccount['200']> {
    return ServerService.callPost("account", ``, (body ? body : {}) as any, {}) as Promise<ResponsePostAdminAccount['200']>;
  }

  /**
   * Count Account
   * [GET]: "/admin/account/count"
   * @link {go}/internal/controllers/accounts/x_gen_admin.go:174 (adminCount)
   */
  getAdminAccountCount(query: RequestGetAdminAccountCount['query']): Promise<ResponseGetAdminAccountCount['200']> {
    return ServerService.callGet("account", `count`, (query ? query : {}) as any) as Promise<ResponseGetAdminAccountCount['200']>;
  }

  /**
   * Get Account
   * [GET]: "/admin/account/{id}"
   * @link {go}/internal/controllers/accounts/x_gen_admin.go:76 (adminGet)
   */
  getAdminAccountById(id: string): Promise<ResponseGetAdminAccountById['200']> {
    return ServerService.callGet("account", `${id}`, {}) as Promise<ResponseGetAdminAccountById['200']>;
  }

  /**
   * Update Account
   * [PUT]: "/admin/account/{id}"
   * @link {go}/internal/controllers/accounts/x_gen_admin.go:134 (adminUpdate)
   */
  putAdminAccountById(id: string, body: RequestPutAdminAccountById['body']): Promise<ResponsePutAdminAccountById['200']> {
    return ServerService.callPut("account", `${id}`, (body ? body : {}) as any, {}) as Promise<ResponsePutAdminAccountById['200']>;
  }
}

export const AdminAccountService = new AdminAccountServiceClass();
