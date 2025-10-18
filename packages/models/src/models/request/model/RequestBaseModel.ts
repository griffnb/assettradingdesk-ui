import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { Dayjs } from "dayjs";

export class RequestMetaData {
  legacy_id: number = 0;
  legacy_key: string = "";
}

export class RequestBaseModel extends BaseModel {
  @attr("uuid", { nullable: true }) organization_id: string | null = null;
  @attr("uuid", { nullable: true }) company_id: string | null = null;
  @attr("uuid", { nullable: true }) client_id: string | null = null;
  @attr("uuid", { nullable: true }) account_id: string | null = null;
  @attr("uuid", { nullable: true }) source_request_id: string | null = null;
  @attr("uuid", { nullable: true }) model_id: string | null = null;
  @attr("uuid", { nullable: true }) manufacturer_id: string | null = null;
  @attr("uuid", { nullable: true }) category_id: string | null = null;
  @attr("string") description: string = "";
  @attr("string") configuration_notes: string = "";
  @attr("json", { classType: RequestMetaData }) meta_data: RequestMetaData =
    new RequestMetaData();
  @attr("decimal") min_price: number = 0;
  @attr("decimal") max_price: number = 0;
  @attr("number") time_frame: number = 0;
  @attr("ts-dayjs") expire_at_ts: Dayjs | null = null;
}
