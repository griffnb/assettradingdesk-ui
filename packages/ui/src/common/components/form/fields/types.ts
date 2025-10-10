import { ValidationRule } from "@/utils/validations";
import { ReactNode } from "react";
import { WrapVariantKeys } from "./FormFieldWrap";

export interface BaseFormFieldProps {
  label: string;
  placeholder?: string;
  helpText?: ReactNode;
  prepend?: string | ReactNode;
  append?: string | ReactNode;
  wrapVariant?: WrapVariantKeys;
  inputVariant?: string;
  required?: boolean;
  validateOn?: "blur" | "change" | "submit";
  validationRule?: ValidationRule;
  extraErrors?: string[];
}

export interface FormFieldProps<T> extends BaseFormFieldProps {
  record: T;
  field: string & keyof T;
  label: string;
  onRecordUpdate?: (record: T) => void;
}
