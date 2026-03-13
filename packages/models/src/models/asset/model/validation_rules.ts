import { ValidationRulesType } from "@/common_lib/utils/validations";
import { type AssetBaseModel } from "./AssetBaseModel";
export const validationRules: ValidationRulesType<AssetBaseModel> = {
  model_id: {
    required: {
      message: "Model is required",
    },
  },
  year: {
    required: {
      message: "Model Year is required",
    },
    min_value: {
      setting: 1970,
      message: "Model Year must be at least 1970",
    },
    max_value: {
      setting: new Date().getFullYear() + 1,
      message: `Model Year cannot be greater than ${new Date().getFullYear() + 1}`,
    },
  },
  price: {
    required: {
      message: "Asking price is required",
    },
  },
};
