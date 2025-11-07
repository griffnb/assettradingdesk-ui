import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class PipelineBaseModel extends BaseModel {
  @attr("string") name: string = "";
  @attr("uuid") organization_id: string | null = null;
  @attr("number") stage: number = 0;
  @attr("uuid") buyer_owner_account_id: string | null = null;
  @attr("uuid") buyer_client_id: string | null = null;
  @attr("uuid") seller_owner_account_id: string | null = null;
  @attr("uuid") seller_client_id: string | null = null;

  // Join fields
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
