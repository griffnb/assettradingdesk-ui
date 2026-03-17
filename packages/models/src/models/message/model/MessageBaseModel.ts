import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { AssetFileModel } from "../../asset_file/model/AssetFileModel";

// Placeholder class for meta_data - to be defined later
export class MessageMetaData {
  // Add fields as needed
}

export class MessageBaseModel extends BaseModel {
  @attr("uuid") from_account_id: string | null = null;
  @attr("uuid") seller_organization_id: string | null = null;
  @attr("uuid") buyer_organization_id: string | null = null;
  @attr("uuid") thread_id: string | null = null;
  @attr("uuid") to_account_id: string | null = null;
  @attr("string") body: string = "";
  @attr("json", { classType: MessageMetaData }) meta_data: MessageMetaData =
    new MessageMetaData();
  @attr("uuid") asset_id: string | null = null;
  @attr("uuid") opportunity_id: string | null = null;
  @attr("uuid") pipeline_id: string | null = null;
  @attr("number") is_read: number = 0;

  // Join fields (read-only)
  @attr("string", { readOnly: true }) created_by_name: string = "";
  @attr("string", { readOnly: true }) updated_by_name: string = "";

  @attr("number", { readOnly: true }) unread_count: number = 0;
  @attr("number", { readOnly: true }) total_count: number = 0;
  @attr("string", { readOnly: true }) from_account_name: string = "";
  @attr("string", { readOnly: true }) to_account_name: string = "";

  // Thread Joins

  @attr("string", { readOnly: true }) model_name: string | null = null;
  @attr("string", { readOnly: true }) model_description: string | null = null;
  @attr("string", { readOnly: true }) model_slug: string | null = null;
  @attr("string", { readOnly: true }) manufacturer_name: string | null = null;
  @attr("string", { readOnly: true }) manufacturer_description: string | null =
    null;
  @attr("uuid", { readOnly: true }) manufacturer_id: string | null = null;
  @attr("string", { readOnly: true }) manufacturer_slug: string | null = null;
  @attr("string", { readOnly: true }) category_name: string | null = null;
  @attr("string", { readOnly: true }) category_description: string | null =
    null;
  @attr("uuid", { readOnly: true }) category_id: string | null = null;
  @attr("string", { readOnly: true }) category_slug: string | null = null;

  @attr("json", { classType: AssetFileModel, readOnly: true })
  asset_files: AssetFileModel[] = [];
}
