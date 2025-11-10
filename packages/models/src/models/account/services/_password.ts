import { ServerService } from "@/common_lib/services/ServerService";

interface SetPasswordParams {
  email: string;
  password: string;
  password_confirmation: string;
  verify: string;
}

export function setPassword(params: SetPasswordParams) {
  return ServerService.callPost("account", "setPassword", {
    email: params.email,
    password_confirmation: params.password_confirmation,
    password: params.password,
    verify: params.verify,
  });
}
