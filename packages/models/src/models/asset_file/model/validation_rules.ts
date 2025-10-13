import { ValidationRulesType } from "@/utils/validations";
import { type AssetFileBaseModel } from "./AssetFileBaseModel";

export const validationRules: ValidationRulesType<AssetFileBaseModel> = {
  asset_id: {
    required: {
      message: "Asset is required",
    },
  },
};
