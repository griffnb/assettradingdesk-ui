import { StoreKeys } from "@/models/types/store_keys";
import { MultiSelectBaseProps } from "./base/select/MultiSelectBase";
import { SelectBaseProps } from "./base/select/SelectBase";

export interface BaseModelSelectProps<T>
  extends Omit<
    SelectBaseProps<T>,
    "idField" | "optionField" | "options" | "selected" | "searchFunction"
  > {
  modelName: StoreKeys;
  modelDisplayField: keyof T;
  customPath?: string;
  idField?: keyof T;
}

export interface BaseModelMultiSelectProps<T>
  extends Omit<
    MultiSelectBaseProps<T>,
    "idField" | "optionField" | "options" | "selected" | "searchFunction"
  > {
  modelName: StoreKeys;
  modelDisplayField: keyof T;
  customPath?: string;
  idField?: keyof T;
}
