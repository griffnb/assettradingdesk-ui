import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { ValidationClass } from "@/utils/validations";

export class ContactInfo extends ValidationClass {
  linkedin: string = "";
}

export class ClientBaseModel extends BaseModel {
  @attr("uuid") organization_id: string | null = null;
  @attr("uuid") company_id: string | null = null;
  @attr("uuid") facility_id: string | null = null;
  @attr("uuid") supervisor_client_id: string | null = null;
  @attr("uuid") source_account_id: string | null = null;
  @attr("string") name: string = "";
  @attr("string") title: string = "";
  @attr("number") is_decision_maker: number = 0;
  @attr("string") email: string = "";
  @attr("string") phone: string = "";
  @attr("string") mobile: string = "";
  @attr("json", { classType: ContactInfo }) contact_info: ContactInfo =
    new ContactInfo();

  @attr("string", { readOnly: true }) facility_name: string = "";
  @attr("string", { readOnly: true }) supervisor_name: string = "";
  @attr("string", { readOnly: true }) company_name: string = "";
}
