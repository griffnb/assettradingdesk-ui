import { ValidationRulesType } from "@/utils/validations";
import { makeAutoObservable } from "mobx";
import { signup_validation_rules } from "./signup_validation_rules";

export class Signup {
  first_name: string = "";

  last_name: string = "";

  email: string = "";
  cf_token: string = "";

  org_invite_key: string = "";

  tryValidation: boolean = false;

  password_set: boolean = true;
  password: string = "";
  password_confirmation: string = "";
  current_password: string = "";

  phone: string = "";

  isOrgSignup: boolean = false;

  get validationRules(): ValidationRulesType<Signup> {
    return signup_validation_rules;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
