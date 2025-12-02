import { constants, findConstant } from "@/models/constants";
import { IStore } from "@/models/types/store";
import { ValidationRules } from "@/utils/validations";
import { AdminBaseModel } from "./AdminBaseModel";
import { validationRules } from "./validation_rules";

export class AdminModel extends AdminBaseModel {
  _model_name = "admin";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  get roleFmt(): string {
    if (this.role !== null) {
      const constant = findConstant(constants.admin.role, this.role);
      return constant.label;
    }
    return "";
  }

  get name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  //TODO
  getParent() {
    return null;
  }

  getBreadCrumb() {
    return {
      title: "",
      url: "",
    };
  }

  constructor(store: IStore<AdminModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.bookmarks, this, "bookmarks");
  }
}
