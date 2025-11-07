import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

// Placeholder class for meta_data - to be defined later
export class MessageMetaData {
  // Add fields as needed
}

export class MessageBaseModel extends BaseModel {
  @attr("uuid") from_account_id: string | null = null;
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
}
