import { findConstant } from "@/models/constants";
import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { constants } from "../constants";
import { ModelBaseModel } from "./ModelBaseModel";
import { validationRules } from "./validation_rules";

export class ModelModel extends ModelBaseModel {
  _model_name = "model";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `${this.name}`;
  }

  get icon(): string {
    return "fa fa-cube";
  }

  get link(): string {
    return `/models/details/${this.id}`;
  }

  // Computed property for status label using constants
  get statusLabel(): string {
    const constant = findConstant(constants.status, this.status);
    return constant.label;
  }

  // Business logic: check if model has a slug
  get hasSlug(): boolean {
    return !!this.slug && this.slug.trim().length > 0;
  }

  // Business logic: check if model has legacy data
  get hasLegacyData(): boolean {
    return this.meta_data.legacy_id > 0;
  }

  getParent(): ParentInfo | null {
    return null;
  }

  getBreadCrumb() {
    return {
      title: this.name || "Model",
      url: `/models/details/${this.id}`,
    };
  }

  constructor(store: IStore<ModelModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.meta_data, this, "meta_data"); // Make nested object observable
  }
}
