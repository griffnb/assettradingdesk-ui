import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { FacilityBaseModel } from "./FacilityBaseModel";
import { validationRules } from "./validation_rules";

export class FacilityModel extends FacilityBaseModel {
  _model_name = "facility";
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

  get link(): string {
    return `/facilities/details/${this.id}`;
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
