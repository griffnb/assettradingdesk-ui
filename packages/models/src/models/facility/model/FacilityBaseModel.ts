import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { ValidationClass } from "@/utils/validations";

export class FacilityAddress extends ValidationClass {
  raw_address: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";
}

export class FacilityMetaData extends ValidationClass {
  wafer_sizes: number[] = [];
  company_types: number[] = [];
}

export class FacilityBaseModel extends BaseModel {
  @attr("uuid", { nullable: true }) organization_id: string | null = null;
  @attr("uuid", { nullable: true }) company_id: string | null = null;
  @attr("string") name: string = "";
  @attr("string") country: string = "";
  @attr("json", { classType: FacilityAddress }) address: FacilityAddress =
    new FacilityAddress();
  @attr("string") phone: string = "";
  @attr("string") description: string = "";
  @attr("json", { classType: FacilityMetaData }) meta_data: FacilityMetaData =
    new FacilityMetaData();
}
