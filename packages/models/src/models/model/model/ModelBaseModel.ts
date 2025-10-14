import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { ModelMetaData } from "./ModelMetaData";

export class ModelBaseModel extends BaseModel {
  // UUID fields for relationships (nullable as indicated in Go with null:"true")
  @attr("uuid", { nullable: true }) manufacturer_id: string | null = null;
  @attr("uuid", { nullable: true }) category_id: string | null = null;

  // String fields
  @attr("string") name: string = "";
  @attr("string") description: string = "";
  @attr("string") slug: string = "";

  // JSON metadata field
  @attr("json") meta_data: ModelMetaData = new ModelMetaData();

  // Join data fields (read-only)
  @attr("string", { readOnly: true }) created_by_name: string = "";
  @attr("string", { readOnly: true }) updated_by_name: string = "";

  @attr("number", { readOnly: true }) asset_count: number = 0;
}
