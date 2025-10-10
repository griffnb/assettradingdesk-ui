import { StoreModel } from "@/models/store/StoreModel";

export interface LinkableRecord extends StoreModel {
  icon: string;
  label: string;
  _model_name: string;
  link: string;
  name?: string;
}
