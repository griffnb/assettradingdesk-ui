import { ValidationRulesType } from "@/utils/validations";
import { type Signup } from "./Signup";

export const signup_validation_rules: ValidationRulesType<Signup> = {
  first_name: {
    required: {
      message: "First Name is required",
    },
  },
  last_name: {
    required: {
      message: "Last Name is required",
    },
  },
  email: {
    required: {
      message: "Email is required",
    },
    email: {
      message: "Email is invalid",
    },
  },
};
