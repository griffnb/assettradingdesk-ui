import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class AccountBaseModel extends BaseModel {
  @attr("string") first_name: string = "";
  @attr("string") middle_name: string = "";
  @attr("string") last_name: string = "";
  @attr("string") email: string | null = null;

  @attr("number") role: number = 0;
  @attr("number") org_role: number = 0;
  @attr("number") test_user_type: number | null = null;

  // Joins

  @attr("number", { readOnly: true }) is_super_user_session: number | null =
    null;

  @attr("string", { readOnly: true }) name: string = "";
}
