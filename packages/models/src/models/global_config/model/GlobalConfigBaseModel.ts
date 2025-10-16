import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class GlobalConfigBaseModel extends BaseModel {
  @attr("string") key: string = "";
  @attr("string") value: string = "";
}
