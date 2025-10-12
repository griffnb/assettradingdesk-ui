import { attr } from "@/models/decorators/attr";
import { BaseModel } from "@/models/BaseModel";

export class IndustryBaseModel extends BaseModel {
  @attr("string") name: string = "";
}
