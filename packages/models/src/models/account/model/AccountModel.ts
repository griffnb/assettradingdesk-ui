import { constants } from "@/models/constants";
import { findConstant } from "@/models/constants_helpers";
import { IStore } from "@/models/types/store";
import { StoreKeys } from "@/models/types/store_keys";
import { ValidationRules } from "@/utils/validations";
import { AccountBaseModel } from "./AccountBaseModel";

export class AccountModel extends AccountBaseModel {
  _model_name: StoreKeys = "account";

  get validationRules(): ValidationRules {
    return {};
  }

  // Search Result Values
  get label(): string {
    return `${this.name}`;
  }

  get icon(): string {
    return "fa fa-user";
  }

  link(target: "edit" | "details" = "details"): string {
    return `/accounts/${target}/${this.id}`;
  }

  get isSuperUsed(): boolean {
    return (
      this.is_super_user_session !== null && this.is_super_user_session > 0
    );
  }

  get roleFmt(): string {
    if (this.role) {
      return findConstant(constants.account.role, this.role)?.label || "";
    }
    return "";
  }

  get test_user_typeFmt(): string {
    if (this.test_user_type) {
      return (
        findConstant(constants.account.test_user_type, this.test_user_type)
          ?.label || ""
      );
    }
    return "";
  }

  get emailVerifiedAtFmt(): string {
    if (this.email_verified_at_ts) {
      return this.email_verified_at_ts.format("YYYY-MM-DD");
    }
    return "";
  }

  get lastLoginFmt(): string {
    if (this.last_login_ts) {
      return this.last_login_ts.format("YYYY-MM-DD HH:mm:ss");
    }
    return "";
  }

  getParent() {
    return null;
  }

  getBreadCrumb() {
    return {
      title: ``,
      url: ``,
    };
  }

  _testData() {
    this.email = `test${Math.floor(Math.random() * 100000)}@test.com`;
    this.first_name = `Test${Math.floor(Math.random() * 100000)}`;
    this.last_name = `User${Math.floor(Math.random() * 100000)}`;
  }

  constructor(store: IStore<AccountModel>) {
    super(store);
    this.addObserve(this);
  }
}
