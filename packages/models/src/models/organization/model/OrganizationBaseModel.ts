import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { ValidationClass } from "@/utils/validations";

export class OrganizationProperties extends ValidationClass {
  billing_email: string = "";
}

export class OrganizationBaseModel extends BaseModel {
  @attr("string") name: string = "";
  @attr("string") external_id: string = "";
  @attr("string") stripe_id: string = "";
  @attr("uuid") billing_plan_id: string = "";

  @attr("uuid") end_user_company_id: string | null = null;
  @attr("json", { classType: OrganizationProperties })
  properties: OrganizationProperties = new OrganizationProperties();
  @attr("json") meta_data: Record<string, unknown> = {};
  @attr("json") email_domains: string[] = [];
  @attr("string") subdomain: string = "";
  @attr("json") feature_set_overrides: Record<string, unknown> = {};
  @attr("number") organization_type: number = 0;

  // Public Join Data
  @attr("string", { readOnly: true }) billing_plan_name: string | null = null;
  @attr("string", { readOnly: true }) end_user_company_name: string | null =
    null;
}
