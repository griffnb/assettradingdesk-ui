import { BaseModel } from "@/models/BaseModel";
import { ValidationRule } from "@/utils/validations";
import { ReactNode } from "react";

export interface DetailFieldProps<T> {
  record: T;
  parentRecord?: BaseModel;
  field: string & keyof T;
  label: string;
  placeholder?: string;
  helpText?: ReactNode;
  displayField?: string & keyof T;
  reloadOnSave?: (() => void) | boolean;
  link?: string;
  newWindow?: boolean;
  validationRule?: ValidationRule;
  linkLabel?: string;
  linkHandler?: () => void;
}
