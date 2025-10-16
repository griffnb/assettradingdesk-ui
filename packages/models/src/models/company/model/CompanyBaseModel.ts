import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";

export class CompanyAddress {
  raw_address: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";
}

export class CompanyMetaData {
  legacy_id: number = 0;
  legacy_key: string = "";
}

export class CompanyBaseModel extends BaseModel {
  @attr("uuid", { nullable: true }) organization_id: string | null = null;
  @attr("string") name: string = "";
  @attr("string") country: string = "";
  @attr("json", { classType: CompanyAddress }) address: CompanyAddress =
    new CompanyAddress();
  @attr("string") phone: string = "";
  @attr("string") email: string = "";
  @attr("string") website: string = "";
  @attr("string") description: string = "";
  @attr("json", { classType: CompanyMetaData }) meta_data: CompanyMetaData =
    new CompanyMetaData();
}
