import { ValidationClass } from "@/common_lib/utils/validations";
import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import dayjs from "dayjs";

class SignupProperties extends ValidationClass {
  is_oath: number = 0;
}

export class Properties extends ValidationClass {
  invite_key: string = "";
  invite_ts: number = 0;
  last_seen: number = 0;
  oauth_token: unknown = null;
  external_user_info: unknown = null;
  verify_email_key: string = "";
}

export class AccountBaseModel extends BaseModel {
  @attr("string") email: string = "";
  @attr("ts-dayjs") email_verified_at_ts: dayjs.Dayjs | null = null;
  @attr("string") external_id: string = "";
  @attr("string") first_name: string = "";
  @attr("string") hashed_password: string = "";
  @attr("ts-dayjs") last_login_ts: dayjs.Dayjs | null = null;
  @attr("string") last_name: string = "";
  @attr("uuid") organization_id: string | null = null;
  @attr("ts-dayjs") password_updated_at_ts: dayjs.Dayjs | null = null;
  @attr("string") phone: string = "";
  @attr("json") properties: Properties = new Properties();
  @attr("number") role: number = 1;
  @attr("json") signup_properties: SignupProperties = new SignupProperties();
  @attr("number") test_user_type: number = 0;

  @attr("uuid") facility_id: string | null = null;
  @attr("uuid") company_id: string | null = null;

  // Public Join Data
  @attr("string", { readOnly: true }) name: string | null = null;

  @attr("number", { readOnly: true }) is_super_user_session: number | null =
    null;

  @attr("number", { readOnly: true }) billing_plan_level: number | null = null;
  @attr("decimal", { readOnly: true }) billing_plan_price: number | null = null;
  @attr("json", { readOnly: true }) billing_plan_feature_set: any | null = null;
  @attr("json", { readOnly: true }) feature_set_overrides: any | null = null;
  @attr("json", { readOnly: true }) feature_set: any | null = null;
  @attr("string", { readOnly: true }) organization_name: string | null = null;
  @attr("string", { readOnly: true }) facility_name: string | null = null;
  @attr("uuid", { readOnly: true }) end_user_company_id: string | null = null;
}
