import { ValidationRulesType } from "@/utils/validations";
import { type AdminModel } from "./AdminModel";

export const validationRules: ValidationRulesType<AdminModel> = {
  email: {
    required: {
      message: "Email is required",
    },
    email: {
      message: "Email is invalid",
    },
  },
  name: {
    required: {
      message: "Name is required",
    },
  },
  role: {
    required: {
      message: "Role is required",
    },
  },
};
