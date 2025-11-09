import {
  IJSONAPIType,
  ServerService,
} from "@/common_lib/services/ServerService";
import { Signup } from "../model/Signup";

interface ExistingCheck {
  cf_token: string;

  email: string;
}

interface ExistingResponse {
  exists: boolean;
}

export function checkExisting(
  data: ExistingCheck,
): Promise<IJSONAPIType<ExistingResponse>> {
  return ServerService.callPost("account", `check`, data);
}

export function signup(
  signupModel: Signup,
  oauth?: boolean,
): Promise<IJSONAPIType<any>> {
  return ServerService.callPost("account", oauth ? `signup/oauth` : "signup", {
    first_name: signupModel.first_name,
    last_name: signupModel.last_name,
    email: signupModel.email,
    cf_token: signupModel.cf_token,
    org_invite_key: signupModel.org_invite_key,
    password: signupModel.password,
    password_confirmation: signupModel.password_confirmation,
    phone: signupModel.phone,
  });
}
