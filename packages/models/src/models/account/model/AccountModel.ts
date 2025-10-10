import { IStore } from "@/models/types/store";
import { ValidationRules } from "@/utils/validations";
import { AccountBaseModel } from "./AccountBaseModel";

export class AccountModel extends AccountBaseModel {
  _model_name = "account";

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

  get link(): string {
    return `/accounts/details/${this.id}`;
  }

  get isSuperUsed(): boolean {
    return (
      this.is_super_user_session !== null && this.is_super_user_session > 0
    );
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
