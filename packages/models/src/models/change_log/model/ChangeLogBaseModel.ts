import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import dayjs from "dayjs";

export class ChangeLogBaseModel extends BaseModel {
  @attr("string") object_urn: string = "";
  @attr("string") type: string = "";
  @attr("string") user_urn: string = "";
  @attr("json") before_values: any = {};
  @attr("json") after_values: any = {};
  @attr("ts-dayjs") timestamp: dayjs.Dayjs | null = null;

  @attr("string") user_name: string = "";
}
