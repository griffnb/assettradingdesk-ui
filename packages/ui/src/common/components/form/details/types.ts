import { DotPath } from "@/common_lib/utils/path";
import { ValidationRule } from "@/common_lib/utils/validations";
import { BaseModel } from "@/models/BaseModel";
import { ReactNode } from "react";

export interface DetailFieldProps<T> {
  record: T;
  parentRecord?: BaseModel;
  field: string & keyof T;
  label: string;
  placeholder?: string;
  helpText?: ReactNode;
  displayField?: (string & keyof T) | DotPath<T>;
  reloadOnSave?: (() => void) | boolean;
  link?: string;
  newWindow?: boolean;
  validationRule?: ValidationRule;
  linkLabel?: string;
  linkHandler?: () => void;
}
