import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class OpportunityBaseModel extends BaseModel {
  // Buyer created it
  @attr("uuid") buyer_organization_id: string | null = null;
  @attr("uuid") buyer_account_id: string | null = null;
  @attr("number") buyer_deal_status: number = 0;
  @attr("number") seller_deal_status: number = 0;
  // Seller Created it
  @attr("uuid") seller_organization_id: string | null = null;
  @attr("uuid") seller_account_id: string | null = null;

  // Common fields
  @attr("uuid") pipeline_id: string | null = null;
  @attr("uuid") asset_id: string | null = null;
  @attr("uuid") request_id: string | null = null;
  @attr("number") opportunity_type: number = 0;
  @attr("decimal") current_asset_price: number = 0;
  @attr("decimal") current_request_price: number = 0;
  @attr("number") quantity: number = 0;

  // Join fields
  @attr("string", { readOnly: true }) asset_model_name: string = "";
  @attr("string", { readOnly: true }) asset_manufacturer_name: string = "";
  @attr("string", { readOnly: true }) buyer_client_name: string = "";
  @attr("uuid", { readOnly: true, nullable: true }) buyer_facility_id:
    | string
    | null = null;
  @attr("string", { readOnly: true }) buyer_facility_name: string = "";
  @attr("uuid", { readOnly: true, nullable: true }) buyer_company_id:
    | string
    | null = null;
  @attr("string", { readOnly: true }) buyer_company_name: string = "";
  @attr("string", { readOnly: true }) seller_client_name: string = "";
  @attr("uuid", { readOnly: true, nullable: true }) seller_facility_id:
    | string
    | null = null;
  @attr("string", { readOnly: true }) seller_facility_name: string = "";
  @attr("uuid", { readOnly: true, nullable: true }) seller_company_id:
    | string
    | null = null;
  @attr("string", { readOnly: true }) seller_company_name: string = "";
}
