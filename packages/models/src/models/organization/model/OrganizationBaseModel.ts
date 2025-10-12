import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class OrganizationBaseModel extends BaseModel {
  @attr("string") name: string = "";
  @attr("string") external_id: string = "";
  @attr("json") properties: Record<string, unknown> = {};
  @attr("json") meta_data: Record<string, unknown> = {};
  @attr("string") plan_id: string = "";
}
