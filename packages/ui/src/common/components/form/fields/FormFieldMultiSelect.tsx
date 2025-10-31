import { MultiSelectInput } from "@/ui/common/components/fields/MultiSelectInput";

import { IConstant } from "@/models/types/constants";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormFieldWrap } from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldMultiSelectProps<T extends ValidationType>
  extends FormFieldProps<T> {
  options: IConstant[];
  noSearch?: boolean;
}

// Define the component with correct generic syntax
export const FormFieldMultiSelect = observer(function FormFieldMultiSelect<
  T extends ValidationType,
>(props: FormFieldMultiSelectProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);

  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (value: IConstant[]) => {
    runInAction(() => {
      const key = props.field as keyof T;
      props.record[key] = value.map((v) => v.id) as T[keyof T];
      setValidate(true);
      if (props.onRecordUpdate) props.onRecordUpdate(props.record);
    });
  };

  return (
    <FormFieldWrap {...props} variant={props.wrapVariant}>
      <MultiSelectInput
        {...props}
        values={props.record[props.field] as (string | number)[]}
        handleChange={handleChange}
        errorMessages={errorMessages}
      />
    </FormFieldWrap>
  );
});
