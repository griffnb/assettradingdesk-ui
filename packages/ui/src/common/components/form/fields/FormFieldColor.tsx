import { ValidationType, isFieldValid } from "@/utils/validations";

import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ColorInput } from "../../fields/ColorInput";
import { FormFieldWrap } from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldColorProps<T extends ValidationType>
  extends FormFieldProps<T> {
  readOnly?: boolean;
  onBlur?: () => void;
}

// Define the component with correct generic syntax
export const FormFieldColor = observer(function FormFieldColor<
  T extends ValidationType,
>(props: FormFieldColorProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);
  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (color: string) => {
    runInAction(() => {
      const key = props.field as keyof T;
      props.record[key] = color as T[keyof T];
      setValidate(true);
      if (props.onRecordUpdate) props.onRecordUpdate(props.record);
    });
  };

  return (
    <FormFieldWrap {...props} variant={props.wrapVariant}>
      <ColorInput
        value={props.record[props.field] as string}
        placeholder={props.placeholder}
        errorMessages={errorMessages}
        handleChange={handleChange}
        readOnly={props.readOnly}
        prepend={props.prepend}
        append={props.append}
        onBlur={props.onBlur}
        required={props.required}
      />
    </FormFieldWrap>
  );
});
