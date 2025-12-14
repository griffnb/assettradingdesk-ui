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
}

export class FacilityBaseModel extends BaseModel {
  @attr("uuid") organization_id: string | null = null;
  @attr("uuid") company_id: string | null = null;
  @attr("string") name: string = "";
  @attr("string") country: string = "";
  @attr("json", { classType: FacilityAddress }) address: FacilityAddress =
    new FacilityAddress();
  @attr("string") phone: string = "";
  @attr("string") description: string = "";
  @attr("json", { classType: FacilityMetaData }) meta_data: FacilityMetaData =
    new FacilityMetaData();

  // Public Join Data
  @attr("string", { readOnly: true }) organization_name: string | null = null;
  @attr("string", { readOnly: true }) company_name: string | null = null;
}
