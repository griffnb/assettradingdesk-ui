import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { OpportunityBaseModel } from "./OpportunityBaseModel";
import { validationRules } from "./validation_rules";

export class OpportunityModel extends OpportunityBaseModel {
  _model_name = "opportunity";
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

  get link(): string {
    return `/opportunities/details/${this.id}`;
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
