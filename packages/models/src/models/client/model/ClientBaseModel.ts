import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class ContactInfo {
  linkedin: string = "";
}

export class ClientBaseModel extends BaseModel {
  @attr("uuid", { nullable: true }) organization_id: string | null = null;
  @attr("uuid", { nullable: true }) company_id: string | null = null;
  @attr("uuid", { nullable: true }) facility_id: string | null = null;
  @attr("uuid", { nullable: true }) supervisor_client_id: string | null = null;
  @attr("uuid", { nullable: true }) source_account_id: string | null = null;
  @attr("string") name: string = "";
  @attr("string") title: string = "";
  @attr("number") is_decision_maker: number = 0;
  @attr("string") email: string = "";
  @attr("string") phone: string = "";
  @attr("string") mobile: string = "";
  @attr("json", { classType: ContactInfo }) contact_info: ContactInfo =
    new ContactInfo();
}
