import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { AssetBaseModel } from "./AssetBaseModel";
import { validationRules } from "./validation_rules";

export class AssetModel extends AssetBaseModel {
  _model_name = "asset";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `${this.manufacturer_name} ${this.model_name}`;
  }

  get icon(): string {
    return "fa fa-cog";
  }

  get link(): string {
    return `/assets/details/${this.id}`;
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

  constructor(store: IStore<AssetModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
