import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { FeatureSet } from "./FeatureSet";
import { Properties } from "./Properties";





export class BillingPlanBaseModel extends BaseModel {
  @attr("string") name: string = "";
  @attr("string") internal_name: string = "";
  @attr("decimal") price: number = 0;
  @attr("json", { classType: FeatureSet }) feature_set: FeatureSet =
    new FeatureSet();
  @attr("json", { classType: Properties }) properties: Properties =
    new Properties();
  @attr("number") level: number = 0;
  @attr("number") billing_cycle: number = 0;
  @attr("number") is_default: number = 0;
}
