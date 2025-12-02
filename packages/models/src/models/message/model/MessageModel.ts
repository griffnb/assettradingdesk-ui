import { IStore } from "@/models/types/store";
import { ParentInfo } from "@/ui/common/components/types/bread-crumb";
import { ValidationRules } from "@/utils/validations";
import { MessageBaseModel } from "./MessageBaseModel";
import { validationRules } from "./validation_rules";

export class MessageModel extends MessageBaseModel {
  _model_name = "message";
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

  get link(): string {
    return `/messages/details/${this.id}`;
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

  constructor(store: IStore<MessageModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.meta_data, this, "meta_data");
  }
}
