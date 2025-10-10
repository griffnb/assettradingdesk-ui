import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useId, useState } from "react";

import {
  RadioGroupInput,
  RadioGroupVariants,
} from "../../fields/RadioGroupInput";

import { IConstant } from "@/models/types/constants";
import { isFieldValid, ValidationType } from "@/utils/validations";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldRadioGroupProps<T extends ValidationType>
  extends FormFieldProps<T>,
    RadioGroupVariants {
  options: IConstant[];
  type?: "text" | "number";
}

// Define the component with correct generic syntax
export const FormFieldRadioGroup = observer(
  <T extends ValidationType>(props: FormFieldRadioGroupProps<T>) => {
    const [validate, setValidate] = useState<boolean>(false);
    const id = useId();

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule
      );
    }

    const onChange = (value: IConstant | undefined) => {
      runInAction(() => {
        const key = props.field as keyof T;
        if (value) {
          props.record[key] = value.id as T[keyof T];
        } else {
          props.record[key] = undefined as T[keyof T];
        }
        setValidate(true);
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
      });
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <RadioGroupInput
          {...props}
          value={props.record[props.field] as string}
          onChange={onChange}
          name={id}
          errorMessages={errorMessages}
        />
      </FormFieldWrap>
    );
  }
);
