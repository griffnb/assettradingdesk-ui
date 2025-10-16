import { IStore } from "@/models/types/store";
import { ValidationRules } from "@/utils/validations";
import { GlobalConfigBaseModel } from "./GlobalConfigBaseModel";
import { validationRules } from "./validation_rules";

export class GlobalConfigModel extends GlobalConfigBaseModel {
  _model_name = "global_config";
  get validationRules(): ValidationRules {
    return validationRules;
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

  constructor(store: IStore<GlobalConfigModel>) {
    super(store);
    this.addObserve(this);
  }
}
