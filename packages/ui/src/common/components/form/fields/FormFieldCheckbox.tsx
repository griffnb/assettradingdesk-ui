import { CheckboxInput } from "@/ui/common/components/fields/CheckboxInput";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldCheckboxProps<T> extends FormFieldProps<T> {
  checkedValue?: string | number;
  uncheckedValue?: string | number;
}
// Define the component with correct generic syntax
const FormFieldCheckbox = observer(
  <T extends ValidationType>(rawProps: FormFieldCheckboxProps<T>) => {
    const [validate, setValidate] = useState<boolean>(false);

    const { checkedValue = 1, uncheckedValue = 0, ...props } = rawProps;

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule
      );
    }

    const handleChange = (value: string | number | boolean) => {
      runInAction(() => {
        const key = props.field as keyof T;
        props.record[key] = value as T[keyof T];
        setValidate(true);
        if (props.onRecordUpdate) {
          props.onRecordUpdate(props.record);
        }
      });
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <CheckboxInput
          {...props}
          checkedValue={checkedValue}
          uncheckedValue={uncheckedValue}
          value={props.record[props.field] as number}
          handleChange={handleChange}
          errorMessages={errorMessages}
        />
      </FormFieldWrap>
    );
  }
);

export default FormFieldCheckbox;
