import { ValidationRules } from "@/common_lib/utils/validations";
import { IStore } from "@/models/types/store";
import { StoreKeys } from "@/models/types/store_keys";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { AssetFileTypes } from "../../asset_file/_constants/file_type";
import { MessageBaseModel } from "./MessageBaseModel";
import { validationRules } from "./validation_rules";

export class MessageModel extends MessageBaseModel {
  _model_name: StoreKeys = "message";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    const preview =
      this.body.length > 50 ? this.body.substring(0, 50) + "..." : this.body;
    return preview || `Message ${this.id}`;
  }

  get icon(): string {
    return "fa fa-envelope";
  }

  link(target: "edit" | "details" = "details"): string {
    return `/messages/${target}/${this.id}`;
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

  get asset_make_model(): string {
    return `${this.manufacturer_name} ${this.model_name}`;
  }

  get asset_thumbnail(): string {
    if (this.asset_files && this.asset_files.length > 0) {
      const img = this.asset_files.find(
        (file) =>
          file.file_type == AssetFileTypes.Image &&
          file.meta_data.small_image &&
          file.meta_data.small_image != "",
      );
      if (!img) {
        return "/img/placeholder.png";
      }
      return img
        ? img.meta_data.small_image.replaceAll("_sw.", "_s.")
        : "/img/placeholder.png";
    }
    return "/img/placeholder.png";
  }

  constructor(store: IStore<MessageModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
