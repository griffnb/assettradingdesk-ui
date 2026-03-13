import { ValidationRules } from "@/common_lib/utils/validations";
import { constants } from "@/models/constants";
import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";

import { findConstant } from "@/models/constants_helpers";
import { StoreKeys } from "@/models/types/store_keys";
import { SubscriptionBaseModel } from "./SubscriptionBaseModel";
import { validationRules } from "./validation_rules";

export class SubscriptionModel extends SubscriptionBaseModel {
  _model_name: StoreKeys = "subscription";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `Subscription ${this.subscription_id}`;
  }

  get icon(): string {
    return "fa fa-credit-card";
  }

  link(target: "edit" | "details" = "details"): string {
    return `/subscriptions/${target}/${this.id}`;
  }

  // Helper to get billing provider label
  get billingProviderLabel(): string {
    const constant = findConstant(
      constants.subscription.billing_provider,
      this.billing_provider,
    );
    return constant?.label || "Unknown";
  }

  // Helper to get billing cycle label
  get billingCycleLabel(): string {
    const constant = findConstant(
      constants.billing_plan.billing_cycle,
      this.billing_cycle,
    );
    return constant?.label || "Unknown";
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

  constructor(store: IStore<SubscriptionModel>) {
    super(store);
    this.addObserve(this);
  }
}
