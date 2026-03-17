import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";

export interface LinkableRecord extends StoreModel {
  icon: string;
  label: string;
  _model_name: StoreKeys;
  link: string;
  name?: string;
}
