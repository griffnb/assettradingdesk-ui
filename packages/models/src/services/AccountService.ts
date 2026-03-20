// @ts-nocheck - Auto-generated service file
import { ServerService } from "@/common_lib/services/ServerService";
import { MockableService } from "../mocks/MockableService";
import type {
  RequestGetAccount,
  RequestGetAccountById,
  RequestPostAccount,
  RequestPutAccountById,
  ResponseGetAccount,
  ResponseGetAccountById,
  ResponsePostAccount,
  ResponsePutAccountById
} from "../openapi/types.gen";

/**
 * AccountService
 * Auto-generated service for Account endpoints
 */
class AccountServiceClass extends MockableService<AccountServiceClass> {
  constructor() {
    super();
    this.wrapMethods(this);
  }
  /**
   * List Account
   * [GET]: "/account"
   * @link {go}/internal/controllers/accounts/x_gen_auth.go:37 (authIndex)
   */
  getAccount(query: RequestGetAccount['query']): Promise<ResponseGetAccount['200']> {
    return ServerService.callGet("account", ``, (query ? query : {}) as any) as Promise<ResponseGetAccount['200']>;
  }

  /**
   * Create Account
   * [POST]: "/account/"
   * @link {go}/internal/controllers/accounts/x_gen_auth.go:106 (authCreate)
   */
  postAccount(body: RequestPostAccount['body']): Promise<ResponsePostAccount['200']> {
    return ServerService.callPost("account", ``, (body ? body : {}) as any, {}) as Promise<ResponsePostAccount['200']>;
  }

  /**
   * Get Account
   * [GET]: "/account/{id}"
   * @link {go}/internal/controllers/accounts/x_gen_auth.go:76 (authGet)
   */
  getAccountById(id: string): Promise<ResponseGetAccountById['200']> {
    return ServerService.callGet("account", `${id}`, {}) as Promise<ResponseGetAccountById['200']>;
  }

  /**
   * Update Account
   * [PUT]: "/account/{id}"
   * @link {go}/internal/controllers/accounts/x_gen_auth.go:138 (authUpdate)
   */
  putAccountById(id: string, body: RequestPutAccountById['body']): Promise<ResponsePutAccountById['200']> {
    return ServerService.callPut("account", `${id}`, (body ? body : {}) as any, {}) as Promise<ResponsePutAccountById['200']>;
  }
}

export const AccountService = new AccountServiceClass();
