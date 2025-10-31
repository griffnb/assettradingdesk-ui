import { constants, findConstant } from "@/models/constants";
import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { RequestBaseModel } from "./RequestBaseModel";
import { validationRules } from "./validation_rules";

export class RequestModel extends RequestBaseModel {
  _model_name = "request";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values

  get icon(): string {
    return "fa fa-clipboard-list";
  }

  get link(): string {
    return `/requests/details/${this.id}`;
  }

  get inPipeline(): string {
    if (this.pipeline_ids && this.pipeline_ids.length > 0) {
      return "Yes";
    }
    return "No";
  }

  get company_typesFmt(): string {
    if (this.company_types !== null && this.company_types.length > 0) {
      const typeNames = this.company_types.map((company_type) => {
        const val = findConstant(constants.company.company_type, company_type);

        return val.label;
      });
      return typeNames.join(", ");
    }
    return "";
  }

  get label(): string {
    if (this.model_id) {
      return `${this.manufacturer_name} ${this.model_name}`;
    }

    if (this.category_id && this.manufacturer_id) {
      return `${this.manufacturer_name} ${this.category_name}`;
    }

    if (this.category_id) {
      return this.category_name;
    }

    if (this.manufacturer_id) {
      return this.manufacturer_name;
    }

    return "Unknown";
  }

  get price_range(): string {
    if (this.min_price && this.max_price) {
      return `${this.min_price} - ${this.max_price}`;
    }

    if (this.min_price) {
      return `${this.min_price}+`;
    }

    if (this.max_price) {
      return `${this.max_price}-`;
    }

    return "";
  }

  get year_range(): string {
    if (this.meta_data.min_year && this.meta_data.max_year) {
      return `${this.meta_data.min_year} - ${this.meta_data.max_year}`;
    }

    if (this.meta_data.min_year) {
      return `${this.meta_data.min_year}+`;
    }

    if (this.meta_data.max_year) {
      return `${this.meta_data.max_year}-`;
    }

    return "";
  }

  get install_statusesFmt(): string[] {
    return this.meta_data.install_statuses.map((status) => {
      const val = findConstant(constants.asset.install_status, status);
      return val.label;
    });
  }

  get operational_statusesFmt(): string[] {
    return this.meta_data.operational_statuses.map((status) => {
      const val = findConstant(constants.asset.operational_status, status);
      return val.label;
    });
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

  constructor(store: IStore<RequestModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
