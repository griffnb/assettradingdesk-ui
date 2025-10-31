import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { MetaData } from "./MetaData";

export class AssetFileBaseModel extends BaseModel {
  // Organization and Company references
  @attr("uuid") organization_id: string | null = null;
  @attr("uuid") company_id: string | null = null;
  @attr("uuid") asset_id: string | null = null;

  // File-specific properties
  @attr("number") file_type: number = 0;
  @attr("number") file_order: number = 0;
  @attr("string") file_location: string = "";
  @attr("string") file_name: string = "";

  // JSON metadata
  @attr("json", { classType: MetaData }) meta_data: MetaData = new MetaData();

  // Join fields (readonly)
  @attr("string", { readOnly: true }) created_by_name: string = "";
  @attr("string", { readOnly: true }) updated_by_name: string = "";
}
