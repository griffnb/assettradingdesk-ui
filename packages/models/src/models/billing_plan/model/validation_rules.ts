import { ValidationRulesType } from "@/common_lib/utils/validations";
import { type BillingPlanBaseModel } from "./BillingPlanBaseModel";
import { type Properties } from "./Properties";

export const propertiesValidationRules: ValidationRulesType<Properties> = {
  stripe_price_id: {
    required: {
      message: "Stripe Price ID is required",
    },
    min_length: {
      setting: 1,
      message: "Stripe Price ID must be at least 1 character",
    },
  },
};

export const validationRules: ValidationRulesType<BillingPlanBaseModel> = {
  name: {
    required: {
      message: "Name is required",
    },
    min_length: {
      setting: 1,
      message: "Name must be at least 1 character",
    },
    max_length: {
      setting: 255,
      message: "Name must be less than 255 characters",
    },
  },
  internal_name: {
    required: {
      message: "Internal Name is required",
    },
    min_length: {
      setting: 1,
      message: "Internal Name must be at least 1 character",
    },
    max_length: {
      setting: 255,
      message: "Internal Name must be less than 255 characters",
    },
  },
  price: {
    required: {
      message: "Price is required",
    },
    min_value: {
      setting: 0,
      message: "Price must be at least 0",
    },
  },
  billing_cycle: {
    required: {
      message: "Billing Cycle is required",
    },
  },
};
