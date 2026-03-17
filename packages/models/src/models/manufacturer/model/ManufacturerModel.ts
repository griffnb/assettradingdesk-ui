import { ValidationRules } from "@/common_lib/utils/validations";
import { IStore } from "@/models/types/store";
import { StoreKeys } from "@/models/types/store_keys";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ManufacturerBaseModel } from "./ManufacturerBaseModel";
import { validationRules } from "./validation_rules";

export class ManufacturerModel extends ManufacturerBaseModel {
  _model_name: StoreKeys = "manufacturer";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `${this.name} `;
  }

  get icon(): string {
    return "fa fa-industry";
  }

  link(target: "edit" | "details" = "details"): string {
    return `/manufacturers/${target}/${this.id}`;
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

  constructor(store: IStore<ManufacturerModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
