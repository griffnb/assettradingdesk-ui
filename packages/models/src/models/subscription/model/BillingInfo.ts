import { ValidationClass } from "@/common_lib/utils/validations";

export class BillingInfo extends ValidationClass {
  card_type: string = "";
  card_last4: string = "";
  card_exp_month: number = 0;
  card_exp_year: number = 0;
  card_address1: string = "";
  card_address2: string = "";
  card_city: string = "";
  card_state: string = "";
  card_zip: string = "";
  card_country: string = "";
}
