import {
  IJSONAPIType,
  ServerService,
} from "@/common_lib/services/ServerService";

export type VerifyResponse = {
  token: string;
  onboard?: boolean;
  redirect_url: string;
};

// @link {go}/internal/controllers/accounts/open_verify.go:openVerifyEmail
export function verifyAccount(
  verifyKey: string,
  email?: string,
): Promise<IJSONAPIType<VerifyResponse>> {
  return ServerService.postRaw(`/account/verify`, {
    verify: verifyKey,
    email,
  });
}

// @link {go}/internal/controllers/accounts/open_verify.go:openVerifyInvite
export function verifyInvite(
  verifyKey: string,
  email?: string,
): Promise<IJSONAPIType<VerifyResponse>> {
  return ServerService.postRaw(`/account/verify/invite`, {
    verify: verifyKey,
    email,
  });
}
