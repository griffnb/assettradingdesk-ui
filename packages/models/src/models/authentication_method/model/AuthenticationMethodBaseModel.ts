import { ValidationClass } from "@/common_lib/utils/validations";
import { BaseModel } from "@/models/BaseModel";
import { constants } from "@/models/constants";
import { attr } from "@/models/decorators/attr";
import { WithEnumGetters } from "@/models/types/enum_attrs";
import dayjs from "dayjs";
class Settings extends ValidationClass {
  backup_codes: string[] | null = null;
  sign_count: number | null = null;
  aaguid: string | null = null;
  device_name: string | null = null;
  platform: string | null = null;
  transports: string[] | null = null;
}
export class AuthenticationMethodBaseModel extends BaseModel {
  @attr("uuid") account_id: string | null = null;
  @attr("string") challenge_value: string | null = null;
  @attr("string") provider: string | null = null;
  @attr("ts-dayjs") last_used_at_ts: dayjs.Dayjs | null = null;
  @attr("string") pii_urn: string | null = null;
  @attr("json") settings: Settings = new Settings();
  @attr("string") target: string | null = null;
  @attr("number", { enum: constants.authentication_method.type })
  type: number = 0;
  @attr("ts-dayjs") verified_at_ts: dayjs.Dayjs | null = null;
}

/**
 * Declare which fields have enum decorators for type safety.
 * This tells TypeScript that these enum getter properties exist at runtime.
 */

export interface AuthenticationMethodBaseModel
  extends WithEnumGetters<"type"> {}
