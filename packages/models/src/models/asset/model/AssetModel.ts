import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { AssetFileTypes } from "../../asset_file/_constants/file_type";
import { AssetFileModel } from "../../asset_file/model/AssetFileModel";
import { AssetBaseModel } from "./AssetBaseModel";
import { validationRules } from "./validation_rules";

export class AssetModel extends AssetBaseModel {
  _model_name = "asset";
  get validationRules(): ValidationRules {
    return validationRules;
  }

  // Search Result Values
  get label(): string {
    return `${this.manufacturer_name} ${this.model_name}`;
  }

  get icon(): string {
    return "fa fa-cog";
  }

  get link(): string {
    return `/assets/details/${this.id}`;
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

  get largeImage(): string {
    if (this.asset_files && this.asset_files.length > 0) {
      const img = this.asset_files.find(
        (file) =>
          file.file_type == AssetFileTypes.Image &&
          file.meta_data.large_image &&
          file.meta_data.large_image != "",
      );
      return img
        ? img.meta_data.large_image.replaceAll("_lw.", "_l.")
        : "/img/placeholder.png";
    }
    return "/img/placeholder.png";
  }

  get mediumImage(): string {
    if (this.asset_files && this.asset_files.length > 0) {
      const img = this.asset_files.find(
        (file) =>
          file.file_type == AssetFileTypes.Image &&
          file.meta_data.medium_image &&
          file.meta_data.medium_image != "",
      );
      if (!img) {
        return "/img/placeholder.png";
      }
      return img
        ? img.meta_data.medium_image.replaceAll("_mw.", "_m.")
        : "/img/placeholder.png";
    }
    return "/img/placeholder.png";
  }

  imageValues(size: "sm" | "md" | "lg", skipFirst?: boolean): string[] {
    if (this.asset_files && this.asset_files.length > 0) {
      const images = this.asset_files.filter(
        (file, index) =>
          (skipFirst ? index > 0 : true) &&
          file.file_type == AssetFileTypes.Image &&
          file.meta_data.large_image &&
          file.meta_data.large_image != "",
      );
      return images.map((file) => {
        if (size == "sm") {
          return file.meta_data.small_image.replaceAll("_sw.", "_s.");
        } else if (size == "md") {
          return file.meta_data.medium_image.replaceAll("_mw.", "_m.");
        } else {
          return file.meta_data.large_image.replaceAll("_lw.", "_l.");
        }
      });
    }
    return ["/img/placeholder.png"];
  }

  images(skipFirst?: boolean): AssetFileModel[] {
    if (this.asset_files && this.asset_files.length > 0) {
      const images = this.asset_files.filter(
        (file, index) =>
          (skipFirst ? index > 0 : true) &&
          file.file_type == AssetFileTypes.Image &&
          file.meta_data.large_image &&
          file.meta_data.large_image != "",
      );
      return images;
    }
    return [];
  }

  constructor(store: IStore<AssetModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
