import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class ManufacturerMetaData {
  legacy_id: number = 0;
  legacy_key: string = "";
}

export class ManufacturerBaseModel extends BaseModel {
  @attr("string") name: string = "";
  @attr("string") description: string = "";
  @attr("string") slug: string = "";
  @attr("json", { classType: ManufacturerMetaData })
  meta_data: ManufacturerMetaData = new ManufacturerMetaData();

  @attr("number", { readOnly: true }) asset_count: number = 0;
}
