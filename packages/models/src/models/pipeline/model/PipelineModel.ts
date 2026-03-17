import { ValidationRules } from "@/common_lib/utils/validations";
import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";

import { constants } from "@/models/constants";
import { findConstant } from "@/models/constants_helpers";
import { StoreKeys } from "@/models/types/store_keys";
import { PipelineBaseModel } from "./PipelineBaseModel";
import { validationRules } from "./validation_rules";

export class PipelineModel extends PipelineBaseModel {
  _model_name: StoreKeys = "pipeline";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values

  get label() {
    return `${this.name} | ${this.buyer_client_name} ${this.buyer_company_name} | ${this.seller_client_name} ${this.seller_company_name}`;
  }

  get icon(): string {
    return "fa fa-stream";
  }

  link(target: "edit" | "details" = "details"): string {
    return `/pipelines/${target}/${this.id}`;
  }

  get stageFmt(): string {
    if (this.stage !== null) {
      const val = findConstant(constants.pipeline.stage, this.stage);
      return val.label;
    }
    return "";
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
