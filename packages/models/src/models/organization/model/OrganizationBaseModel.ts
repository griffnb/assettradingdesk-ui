import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class OrganizationBaseModel extends BaseModel {
  @attr("string") name: string = "";
  @attr("string") external_id: string = "";
  @attr("string") stripe_id: string = "";
  @attr("uuid") billing_plan_id: string = "";
  @attr("json") properties: { billing_email?: string } & Record<
    string,
    unknown
  > = {};
  @attr("json") meta_data: Record<string, unknown> = {};
  @attr("json") email_domains: string[] = [];
  @attr("string") subdomain: string = "";
  @attr("json") feature_set_overrides: Record<string, unknown> = {};
  @attr("number") organization_type: number = 0;
}
