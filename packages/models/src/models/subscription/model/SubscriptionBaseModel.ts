import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { BillingInfo } from "./BillingInfo";
import { MetaData } from "./MetaData";

export class SubscriptionBaseModel extends BaseModel {
    @attr("uuid", { nullable: true }) organization_id: string | null = null;
  @attr("uuid", { nullable: true }) billing_plan_id: string | null = null;
  @attr("number") level: number = 0;
  @attr("number") billing_provider: number = 0;
  @attr("string") subscription_id: string = "";
  @attr("string") price_or_plan_id: string = "";
  @attr("number") start_ts: number = 0;
  @attr("number") end_ts: number = 0;
  @attr("number") next_billing_ts: number = 0;
  @attr("number") billing_cycle: number = 0;
  @attr("decimal") amount: number = 0;
  @attr("string") coupon_code: string = "";
  @attr("json", { classType: BillingInfo }) billing_info: BillingInfo =
    new BillingInfo();
  @attr("json", { classType: MetaData }) meta_data: MetaData = new MetaData();
}
