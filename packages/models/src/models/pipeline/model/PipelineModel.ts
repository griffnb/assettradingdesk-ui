import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { PipelineBaseModel } from "./PipelineBaseModel";
import { validationRules } from "./validation_rules";

export class PipelineModel extends PipelineBaseModel {
  _model_name = "pipeline";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `Pipeline ${this.id}`;
  }

  get icon(): string {
    return "fa fa-stream";
  }

  get link(): string {
    return `/pipelines/details/${this.id}`;
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

  constructor(store: IStore<PipelineModel>) {
    super(store);
    this.addObserve(this);
  }
}
