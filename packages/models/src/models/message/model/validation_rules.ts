import { ValidationRulesType } from "@/common_lib/utils/validations";
import { type MessageBaseModel } from "./MessageBaseModel";
export const validationRules: ValidationRulesType<MessageBaseModel> = {
  body: {
    required: {
      message: "Message body is required.",
    },
  },
};
