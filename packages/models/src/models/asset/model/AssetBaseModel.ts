import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import dayjs from "dayjs";
import { AssetFileModel } from "../../asset_file/model/AssetFileModel";

export class AssetMetaData {
  legacy_id: number = 0;
  legacy_key: string = "";
  wafer_size: number = 0;
}

export class AssetBaseModel extends BaseModel {
  // Self Made
  @attr("uuid") organization_id: string | null = null;
  @attr("uuid") account_id: string | null = null;
  // CRM Made
  @attr("uuid") company_id: string | null = null;
  @attr("uuid") client_id: string | null = null;
  // Common Fields
  @attr("uuid") model_id: string | null = null;
  @attr("string") description: string = "";
  @attr("string") location: string = "";
  @attr("string") configuration_notes: string = "";
  @attr("number") install_status: number = 0;
  @attr("number") operational_status: number = 0;
  @attr("number") year: number = 0;
  @attr("number") quantity: number = 0;
  @attr("decimal") price: number = 0;
  @attr("string") notes: string = "";
  @attr("string") serial_number: string = "";
  @attr("ts-dayjs") verified_at_ts: dayjs.Dayjs = dayjs();
  @attr("json", { classType: AssetMetaData }) meta_data: AssetMetaData =
    new AssetMetaData();

  @attr("json", { classType: AssetFileModel, readOnly: true })
  asset_files: AssetFileModel[] = [];

  // Public Join Data
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
  @attr("string", { readOnly: true }) industry_name: string | null = null;
  @attr("uuid", { readOnly: true }) industry_id: string | null = null;
  @attr("string", { readOnly: true }) client_name: string | null = null;
  @attr("string", { readOnly: true }) company_name: string | null = null;
  @attr("json", { readOnly: true }) company_types: number[] | null = null;

  @attr("string", { readOnly: true }) facility_name: string | null = null;
  @attr("uuid", { readOnly: true }) facility_id: string | null = null;
  @attr("json", { readOnly: true }) pipeline_ids: string[] | null = null;
  @attr("number", { readOnly: true }) picture_count: number | null = null;
}
