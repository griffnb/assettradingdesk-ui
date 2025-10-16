import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class PipelineBaseModel extends BaseModel {
  @attr("uuid", { nullable: true }) organization_id: string | null = null;
  @attr("number") stage: number = 0;
  @attr("uuid", { nullable: true }) buyer_owner_account_id: string | null =
    null;
  @attr("uuid", { nullable: true }) buyer_client_id: string | null = null;
  @attr("uuid", { nullable: true }) seller_owner_account_id: string | null =
    null;
  @attr("uuid", { nullable: true }) seller_client_id: string | null = null;
}
