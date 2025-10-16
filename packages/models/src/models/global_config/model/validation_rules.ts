import { ValidationRulesType } from "@/utils/validations";
import { type GlobalConfigModel } from "./GlobalConfigModel";

export const validationRules: ValidationRulesType<GlobalConfigModel> = {
  key: {
    required: {
      message: "Key is required",
    },
  },
  value: {
    required: {
      message: "Value is required",
    },
  },
};
