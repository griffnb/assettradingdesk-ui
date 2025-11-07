import { BaseModel } from "@/models/BaseModel";
import { constants, findConstant } from "@/models/constants";
import { attr } from "@/models/decorators/attr";
import { ValidationClass } from "@/utils/validations";
import { Dayjs } from "dayjs";

export class RequestMetaData extends ValidationClass {
  install_statuses: number[] = [];
  operational_statuses: number[] = [];
  min_year: number = 0;
  max_year: number = 0;

  get install_statusesFmt(): string[] {
    return this.install_statuses.map((status) => {
      const val = findConstant(constants.asset.install_status, status);
      return val.label;
    });
  }

  get operational_statusesFmt(): string[] {
    return this.operational_statuses.map((status) => {
      const val = findConstant(constants.asset.operational_status, status);
      return val.label;
    });
  }
}

export class RequestBaseModel extends BaseModel {
  @attr("uuid") organization_id: string | null = null;
  @attr("uuid") company_id: string | null = null;
  @attr("uuid") client_id: string | null = null;
  @attr("uuid") account_id: string | null = null;
  @attr("uuid") source_request_id: string | null = null;
  @attr("uuid") model_id: string | null = null;
  @attr("uuid") manufacturer_id: string | null = null;
  @attr("uuid") category_id: string | null = null;
  @attr("string") description: string = "";
  @attr("string") configuration_notes: string = "";
  @attr("json", { classType: RequestMetaData }) meta_data: RequestMetaData =
    new RequestMetaData();
  @attr("decimal") min_price: number = 0;
  @attr("decimal") max_price: number = 0;
  @attr("number") time_frame: number = 0;
  @attr("ts-dayjs") expire_at_ts: Dayjs | null = null;

  @attr("string", { readOnly: true }) model_name: string = "";
  @attr("string", { readOnly: true }) manufacturer_name: string = "";
  @attr("string", { readOnly: true }) category_name: string = "";

  @attr("string", { readOnly: true }) industry_name: string = "";
  @attr("uuid", { readOnly: true }) industry_id: number = 0;
  @attr("string", { readOnly: true }) client_name: string = "";
  @attr("string", { readOnly: true }) company_name: string = "";

  @attr("json", { readOnly: true }) company_types: number[] = [];
  @attr("string", { readOnly: true }) facility_name: string = "";
  @attr("uuid", { readOnly: true }) facility_id: string | null = null;

  @attr("json", { readOnly: true }) pipeline_ids: number[] = [];
}
