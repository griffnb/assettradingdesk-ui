import { formatPhoneNumber } from "@/common_lib/utils/strings";
import { ValidationRules } from "@/common_lib/utils/validations";
import { IStore } from "@/models/types/store";
import { StoreKeys } from "@/models/types/store_keys";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { AuthenticationMethodBaseModel } from "./AuthenticationMethodBaseModel";
import { validationRules } from "./validation_rules";

export class AuthenticationMethodModel extends AuthenticationMethodBaseModel {
  _model_name: StoreKeys = "authentication_method";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return this.typeEnum.label;
  }

  get icon(): string {
    return "fa fa-key";
  }

  get link(): string {
    return `/authentication_methods/details/${this.id}`;
  }

  get formatedPhone(): string {
    if (this.target?.startsWith("+1")) {
      const cleaned = this.target.replace("+1", "");
      return formatPhoneNumber(cleaned, "+1 (xxx) xxx-xxxx");
    }
    return formatPhoneNumber(this.target || "", "+1 (xxx) xxx-xxxx");
  }

  getParent(): ParentInfo | null {
    /*
    return {
      model: "",
      id: `${this.family_id}`,
    };
    */
    return null;
  }

  getBreadCrumb() {
    //parent: any) {
    /*
    return {
      title: parent ? parent.name : this.family_primary_account_name,
      url: `/families/details/${this.family_id}`,
    };
    */
    return {
      title: "",
      url: "",
    };
  }

  constructor(store: IStore<AuthenticationMethodModel>) {
    super(store);
    this.addObserve(this);
  }
}
