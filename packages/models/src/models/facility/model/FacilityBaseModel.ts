import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class FacilityAddress {
  raw_address: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";
}

export class FacilityMetaData {
  legacy_id: number = 0;
  legacy_key: string = "";
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
