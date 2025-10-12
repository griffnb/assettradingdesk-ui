import { IStore } from "@/models/types/store";
import { ValidationRules } from "@/utils/validations";
import { ChangeLogBaseModel } from "./ChangeLogBaseModel";
import { validationRules } from "./validation_rules";

export class ChangeLogModel extends ChangeLogBaseModel {
  _model_name = "change_log";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return "";
  }

  get icon(): string {
    return "fa fa-user";
  }

  get link(): string {
    return `/change_logs/details/${this.id}`;
  }

  get timestampFmt(): string {
    return this.timestamp?.format("YYYY-MM-DD HH:mm:ss") || "";
  }

  //TODO
  getParent() {
    return null;
  }

  getBreadCrumb() {
    return {
      title: "Change Log",
      url: "/change_logs",
    };
  }

  constructor(store: IStore<ChangeLogModel>) {
    super(store);
    this.addObserve(this);
  }
}
