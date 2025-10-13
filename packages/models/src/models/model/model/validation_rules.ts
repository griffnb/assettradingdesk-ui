import { ValidationRulesType } from "@/utils/validations";
import { type ModelBaseModel } from "./ModelBaseModel";

export const validationRules: ValidationRulesType<ModelBaseModel> = {
  name: {
    required: {
      message: "Name is required",
    },
    max_length: {
      setting: 255,
      message: "Name must be less than 255 characters",
    },
  },
  description: {
    max_length: {
      setting: 1000,
      message: "Description must be less than 1000 characters",
    },
  },
  slug: {
    max_length: {
      setting: 255,
      message: "Slug must be less than 255 characters",
    },
  },
};
