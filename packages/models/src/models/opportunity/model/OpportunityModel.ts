import { IStore } from "@/models/types/store";
import { StoreKeys } from "@/models/types/store_keys";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { OpportunityBaseModel } from "./OpportunityBaseModel";
import { validationRules } from "./validation_rules";

export class OpportunityModel extends OpportunityBaseModel {
  _model_name: StoreKeys = "opportunity";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `Opportunity ${this.id}`;
  }

  get icon(): string {
    return "fa fa-handshake";
  }

  link(target: "edit" | "details" = "details"): string {
    return `/opportunities/${target}/${this.id}`;
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

  constructor(store: IStore<OpportunityModel>) {
    super(store);
    this.addObserve(this);
  }
}
