import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FocusEvent, useState } from "react";
import { PhoneInput, PhoneInputProps } from "../../fields/PhoneInput";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldPhoneProps<T extends ValidationType>
  extends FormFieldProps<T>,
    Omit<
      PhoneInputProps,
      "handleChange" | "value" | "errorMessages" | "label"
    > {
  readOnly?: boolean;
}

// Define the component with correct generic syntax
export const FormFieldPhone = observer(
  <T extends ValidationType>(rawProps: FormFieldPhoneProps<T>) => {
    const { extraErrors, ...props } = rawProps;

    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule
      );
    }

    if (extraErrors) {
      errorMessages = [...errorMessages, ...extraErrors];
    }

    const handleChange = (value: string) => {
      runInAction(() => {
        const key = props.field as keyof T;
        props.record[key] = value as T[keyof T];
      });
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (props.validateOn == "blur") {
        setValidate(true);
      }
      setValidate(true);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <PhoneInput
          {...props}
          value={props.record[props.field] as string}
          placeholder={props.placeholder}
          handleChange={handleChange}
          errorMessages={errorMessages}
          onBlur={onBlur}
        />
      </FormFieldWrap>
    );
  }
);
