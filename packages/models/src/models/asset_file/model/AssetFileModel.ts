import { findConstant } from "@/models/constants";
import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { constants } from "../constants";
import { AssetFileBaseModel } from "./AssetFileBaseModel";
import { validationRules } from "./validation_rules";

export class AssetFileModel extends AssetFileBaseModel {
  _model_name = "asset_file";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Computed properties
  get file_type_label(): string {
    const constant = findConstant(constants.file_type, this.file_type);
    return constant ? constant.label : "Unknown";
  }

  get status_label(): string {
    const constant = findConstant(constants.status, this.status);
    return constant ? constant.label : "Unknown";
  }

  // Search Result Values
  get label(): string {
    return `${this.file_name}`;
  }

  get icon(): string {
    return "fa fa-file";
  }

  get link(): string {
    return `/asset_files/details/${this.id}`;
  }

  getParent(): ParentInfo | null {
    if (this.asset_id) {
      return {
        model: "asset",
        id: this.asset_id,
      };
    }
    return null;
  }

  getBreadCrumb() {
    return {
      title: this.file_name || "Asset File",
      url: `/asset_files/details/${this.id}`,
    };
  }

  constructor(store: IStore<AssetFileModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
