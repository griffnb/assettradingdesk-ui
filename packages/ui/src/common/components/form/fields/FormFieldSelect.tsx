import {
  SelectInput,
  SelectInputProps,
} from "@/ui/common/components/fields/SelectInput";

import { IConstant } from "@/models/types/constants";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormFieldWrap } from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldSelectProps<T extends ValidationType>
  extends FormFieldProps<T>,
    Omit<
      SelectInputProps,
      "handleChange" | "value" | "handleChange" | "errorMessages" | "label"
    > {
  options: IConstant[];
  noSearch?: boolean;
  as?: "select" | "combobox";
  clearDefault?: string | number;
}

// Define the component with correct generic syntax
export const FormFieldSelect = observer(function FormFieldSelect<
  T extends ValidationType,
>(props: FormFieldSelectProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);

  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (value: IConstant | undefined) => {
    runInAction(() => {
      const key = props.field as keyof T;
      if (value) {
        props.record[key] = value.id as T[keyof T];
      } else {
        if (props.clearDefault !== undefined) {
          props.record[key] = props.clearDefault as T[keyof T];
        } else {
          props.record[key] = null as T[keyof T];
        }
      }
      setValidate(true);
      if (props.onRecordUpdate) props.onRecordUpdate(props.record);
    });
  };

  return (
    <FormFieldWrap {...props} variant={props.wrapVariant}>
      <SelectInput
        {...props}
        value={props.record[props.field] as string}
        handleChange={handleChange}
        errorMessages={errorMessages}
      />
    </FormFieldWrap>
  );
});
