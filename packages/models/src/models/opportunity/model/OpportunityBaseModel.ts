import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class OpportunityBaseModel extends BaseModel {
  @attr("uuid", { nullable: true }) organization_id: string | null = null;
  @attr("uuid", { nullable: true }) company_id: string | null = null;
  @attr("uuid", { nullable: true }) client_id: string | null = null;
  @attr("uuid", { nullable: true }) pipeline_id: string | null = null;
  @attr("uuid", { nullable: true }) asset_id: string | null = null;
  @attr("uuid", { nullable: true }) request_id: string | null = null;
  @attr("number") opportunity_type: number = 0;
  @attr("decimal") current_asset_price: number = 0;
  @attr("decimal") current_request_price: number = 0;
  @attr("number") quantity: number = 0;
}
