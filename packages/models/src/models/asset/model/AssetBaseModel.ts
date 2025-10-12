import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class AssetMetaData {
  legacy_id: number = 0;
  legacy_key: string = "";
}

export class AssetBaseModel extends BaseModel {
  @attr("uuid", { nullable: true }) organization_id: string | null = null;
  @attr("uuid", { nullable: true }) company_id: string | null = null;
  @attr("uuid", { nullable: true }) client_id: string | null = null;
  @attr("uuid", { nullable: true }) model_id: string | null = null;
  @attr("string") description: string = "";
  @attr("string") configuration_notes: string = "";
  @attr("number") install_status: number = 0;
  @attr("number") operational_status: number = 0;
  @attr("number") year: number = 0;
  @attr("number") quantity: number = 0;
  @attr("decimal") price: number = 0;
  @attr("string") notes: string = "";
  @attr("string") serial_number: string = "";
  @attr("number") verified_at_ts: number = 0;
  @attr("json", { classType: AssetMetaData }) meta_data: AssetMetaData =
    new AssetMetaData();

  @attr("json", { classType: AssetFileModel }) images: AssetFileModel[] =
    new AssetFileModel();
}
