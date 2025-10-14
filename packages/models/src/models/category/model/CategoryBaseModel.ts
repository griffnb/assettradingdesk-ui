import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class CategoryMetaData {
  legacy_id: number = 0;
  legacy_key: string = "";
}

export class CategoryBaseModel extends BaseModel {
  @attr("uuid", { nullable: true }) industry_id: string | null = null;
  @attr("uuid", { nullable: true }) parent_category_id: string | null = null;
  @attr("string") name: string = "";
  @attr("string") description: string = "";
  @attr("string") category_hierarchy: string = "";
  @attr("string") slug: string = "";
  @attr("json", { classType: CategoryMetaData }) meta_data: CategoryMetaData =
    new CategoryMetaData();

  @attr("number", { readOnly: true }) asset_count: number = 0;
  @attr("string", { readOnly: true }) industry_name: string = "";
  @attr("string", { readOnly: true }) parent_name: string = "";
}
