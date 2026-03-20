// @ts-nocheck - Auto-generated service file
import { ServerService } from "@/common_lib/services/ServerService";
import { MockableService } from "../mocks/MockableService";
import type {
  RequestDeleteAuthRegistrationById,
  RequestGetAuth2FaMethods,
  RequestGetAuthRegistrationQrcodeByChallengeId,
  RequestPostAuth2FaDisable,
  RequestPostAuth2FaEnable,
  RequestPostAuth2FaInitiate,
  RequestPostAuth2FaValidated,
  RequestPostAuth2FaVerify,
  RequestPostAuthInitiate,
  RequestPostAuthMethods,
  RequestPostAuthPasswordSet,
  RequestPostAuthRegistration,
  RequestPostAuthRegistrationVerify,
  RequestPostAuthVerify,
  ResponseDeleteAuthRegistrationById,
  ResponseGetAuth2FaMethods,
  ResponseGetAuthRegistrationQrcodeByChallengeId,
  ResponsePostAuth2FaDisable,
  ResponsePostAuth2FaEnable,
  ResponsePostAuth2FaInitiate,
  ResponsePostAuth2FaValidated,
  ResponsePostAuth2FaVerify,
  ResponsePostAuthInitiate,
  ResponsePostAuthMethods,
  ResponsePostAuthPasswordSet,
  ResponsePostAuthRegistration,
  ResponsePostAuthRegistrationVerify,
  ResponsePostAuthVerify
} from "../openapi/types.gen";

/**
 * AuthService
 * Auto-generated service for Auth endpoints
 */
class AuthServiceClass extends MockableService<AuthServiceClass> {
  constructor() {
    super();
    this.wrapMethods(this);
  }
  /**
   * Disable two-factor authentication
   * [POST]: "/auth/2fa/disable"
   * @link {go}/internal/controllers/auth/two_factor.go:89 (authDisableTwoFactor)
   */
  postAuth2FaDisable(): Promise<ResponsePostAuth2FaDisable['200']> {
    return ServerService.callPost("auth", `2fa/disable`, {}, {}) as Promise<ResponsePostAuth2FaDisable['200']>;
  }

  /**
   * Enable two-factor authentication
   * [POST]: "/auth/2fa/enable"
   * @link {go}/internal/controllers/auth/two_factor.go:37 (authEnableTwoFactor)
   */
  postAuth2FaEnable(): Promise<ResponsePostAuth2FaEnable['200']> {
    return ServerService.callPost("auth", `2fa/enable`, {}, {}) as Promise<ResponsePostAuth2FaEnable['200']>;
  }

  /**
   * Initiate two-factor authentication challenge
   * [POST]: "/auth/2fa/initiate"
   * @link {go}/internal/controllers/auth/two_factor.go:148 (authInitiateTwoFactor)
   */
  postAuth2FaInitiate(body: RequestPostAuth2FaInitiate['body']): Promise<ResponsePostAuth2FaInitiate['200']> {
    return ServerService.callPost("auth", `2fa/initiate`, (body ? body : {}) as any, {}) as Promise<ResponsePostAuth2FaInitiate['200']>;
  }

  /**
   * Get 2FA methods for authenticated user
   * [GET]: "/auth/2fa/methods"
   * @link {go}/internal/controllers/auth/methods.go:85 (authTwoFAMethods)
   */
  getAuth2FaMethods(): Promise<ResponseGetAuth2FaMethods['200']> {
    return ServerService.callGet("auth", `2fa/methods`, {}) as Promise<ResponseGetAuth2FaMethods['200']>;
  }

  /**
   * Check if 2FA session is valid
   * [POST]: "/auth/2fa/validated"
   * @link {go}/internal/controllers/auth/two_factor.go:280 (authTwoFASessionValid)
   */
  postAuth2FaValidated(): Promise<ResponsePostAuth2FaValidated['200']> {
    return ServerService.callPost("auth", `2fa/validated`, {}, {}) as Promise<ResponsePostAuth2FaValidated['200']>;
  }

  /**
   * Verify two-factor authentication challenge
   * [POST]: "/auth/2fa/verify"
   * @link {go}/internal/controllers/auth/two_factor.go:222 (authVerifyTwoFA)
   */
  postAuth2FaVerify(body: RequestPostAuth2FaVerify['body']): Promise<ResponsePostAuth2FaVerify['200']> {
    return ServerService.callPost("auth", `2fa/verify`, (body ? body : {}) as any, {}) as Promise<ResponsePostAuth2FaVerify['200']>;
  }

  /**
   * Initiate authentication flow
   * [POST]: "/auth/initiate"
   * @link {go}/internal/controllers/auth/open_login.go:36 (openInitiate)
   */
  postAuthInitiate(body: RequestPostAuthInitiate['body']): Promise<ResponsePostAuthInitiate['200']> {
    return ServerService.callPost("auth", `initiate`, (body ? body : {}) as any, {}) as Promise<ResponsePostAuthInitiate['200']>;
  }

  /**
   * Get authentication methods for user identifier
   * [POST]: "/auth/methods"
   * @link {go}/internal/controllers/auth/methods.go:42 (openGetMethods)
   */
  postAuthMethods(body: RequestPostAuthMethods['body']): Promise<ResponsePostAuthMethods['200']> {
    return ServerService.callPost("auth", `methods`, (body ? body : {}) as any, {}) as Promise<ResponsePostAuthMethods['200']>;
  }

  /**
   * Set or update user password
   * [POST]: "/auth/password/set"
   * @link {go}/internal/controllers/auth/auth_password.go:37 (authSetPassword)
   */
  postAuthPasswordSet(body: RequestPostAuthPasswordSet['body']): Promise<ResponsePostAuthPasswordSet['200']> {
    return ServerService.callPost("auth", `password/set`, (body ? body : {}) as any, {}) as Promise<ResponsePostAuthPasswordSet['200']>;
  }

  /**
   * Initiate registration of a new authentication method
   * [POST]: "/auth/registration"
   * @link {go}/internal/controllers/auth/registration.go:42 (authInitiateRegister)
   */
  postAuthRegistration(body: RequestPostAuthRegistration['body']): Promise<ResponsePostAuthRegistration['200']> {
    return ServerService.callPost("auth", `registration`, (body ? body : {}) as any, {}) as Promise<ResponsePostAuthRegistration['200']>;
  }

  /**
   * Get TOTP QR code for auth registration
   * [GET]: "/auth/registration/qrcode/{challenge_id}"
   * @link {go}/internal/controllers/auth/registration.go:117 (authQRCode)
   */
  getAuthRegistrationQrcodeByChallengeId(challenge_id: string): Promise<ResponseGetAuthRegistrationQrcodeByChallengeId['200']> {
    return ServerService.callGet("auth", `registration/qrcode/${challenge_id}`, {}) as Promise<ResponseGetAuthRegistrationQrcodeByChallengeId['200']>;
  }

  /**
   * Verify and complete authentication method registration
   * [POST]: "/auth/registration/verify"
   * @link {go}/internal/controllers/auth/registration.go:156 (authVerifyRegistration)
   */
  postAuthRegistrationVerify(body: RequestPostAuthRegistrationVerify['body']): Promise<ResponsePostAuthRegistrationVerify['200']> {
    return ServerService.callPost("auth", `registration/verify`, (body ? body : {}) as any, {}) as Promise<ResponsePostAuthRegistrationVerify['200']>;
  }

  /**
   * Remove an authentication method
   * [DELETE]: "/auth/registration/{id}"
   * @link {go}/internal/controllers/auth/registration.go:233 (authRemoveRegistration)
   */
  deleteAuthRegistrationById(id: string): Promise<ResponseDeleteAuthRegistrationById['200']> {
    return ServerService.callDelete("auth", `registration/${id}`, {}) as Promise<ResponseDeleteAuthRegistrationById['200']>;
  }

  /**
   * Verify authentication challenge
   * [POST]: "/auth/verify"
   * @link {go}/internal/controllers/auth/open_login.go:156 (openVerify)
   */
  postAuthVerify(body: RequestPostAuthVerify['body']): Promise<ResponsePostAuthVerify['200']> {
    return ServerService.callPost("auth", `verify`, (body ? body : {}) as any, {}) as Promise<ResponsePostAuthVerify['200']>;
  }
}

export const AuthService = new AuthServiceClass();
