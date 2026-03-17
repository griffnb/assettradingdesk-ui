import { ValidationRules } from "@/common_lib/utils/validations";
import { IStore } from "@/models/types/store";
import { StoreKeys } from "@/models/types/store_keys";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { FacilityBaseModel } from "./FacilityBaseModel";
import { validationRules } from "./validation_rules";

export class FacilityModel extends FacilityBaseModel {
  _model_name: StoreKeys = "facility";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `${this.name} `;
  }

  get icon(): string {
    return "fa fa-warehouse";
  }

  link(target: "edit" | "details" = "details"): string {
    return `/facilities/${target}/${this.id}`;
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

  constructor(store: IStore<FacilityModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.address, this, "address");
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
