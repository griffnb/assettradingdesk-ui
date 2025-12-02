import { ValidationClass } from "@/utils/validations";
import { propertiesValidationRules } from "./validation_rules";

export class Properties extends ValidationClass {
  pricing_text: string = "";
  stripe_price_id: string = "";
  default_discount_code: string = "";
  validationRules = propertiesValidationRules;
}
