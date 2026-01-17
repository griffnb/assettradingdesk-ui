import { constants } from "@/models/constants";
import { findConstant } from "@/models/constants_helpers";
import { IConstant } from "@/models/types/constants";
import { IStore } from "@/models/types/store";
import { StoreKeys } from "@/models/types/store_keys";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { BillingPlanBaseModel } from "./BillingPlanBaseModel";
import { validationRules } from "./validation_rules";

export class BillingPlanModel extends BillingPlanBaseModel {
  _model_name: StoreKeys = "billing_plan";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `${this.name} - $${this.price}`;
  }

  get icon(): string {
    return "fa fa-credit-card";
  }

  get link(): string {
    return `/billing_plans/details/${this.id}`;
  }

  get stripePriceId(): string {
    return this.properties?.stripe_price_id || "";
  }

  get priceFmt(): string {
    return `$${this.price.toFixed(2)}`;
  }

  get isDefaultFmt(): string {
    return this.is_default === 1 ? "Yes" : "No";
  }

  // Helper to get billing cycle label
  get billingCycle(): IConstant {
    return findConstant(
      constants.billing_plan.billing_cycle,
      this.billing_cycle,
    );
  }

  get billingCycleLabel(): string {
    return this.billingCycle.label;
  }

  getParent(): ParentInfo | null {
    /*
    return {
      model: "",
      id: `${this.family_id}`,
    };
    */
    return null;
  }

  getBreadCrumb() {
    //parent: any) {
    /*
    return {
      title: parent ? parent.name : this.family_primary_account_name,
      url: `/families/details/${this.family_id}`,
    };
    */
    return {
      title: "",
      url: "",
    };
  }

  constructor(store: IStore<BillingPlanModel>) {
    super(store);
    this.addObserve(this);
  }
}
