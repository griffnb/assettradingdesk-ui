import { findConstant } from "@/models/constants";
import { IConstant } from "@/models/types/constants";
import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { organization_type } from "../_constants/organization_type";
import { OrganizationBaseModel } from "./OrganizationBaseModel";
import { validationRules } from "./validation_rules";

export class OrganizationModel extends OrganizationBaseModel {
  _model_name = "organization";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `${this.name} `;
  }

  get icon(): string {
    return "fa fa-sitemap";
  }

  get link(): string {
    return `/organizations/details/${this.id}`;
  }

  getParent(): ParentInfo | null {
    return null;
  }

  getBreadCrumb() {
    return {
      title: "",
      url: "",
    };
  }

  get organization_typeConst(): IConstant {
    return findConstant(organization_type, this.organization_type);
  }

  get organization_typeStr(): string {
    return this.organization_typeConst.label;
  }

  constructor(store: IStore<OrganizationModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.properties, this, "properties");
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
