import {
  TextInput,
  TextInputProps,
} from "@/ui/common/components/fields/TextInput";

import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import {
  FocusEvent,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldTextProps<T extends ValidationType>
  extends FormFieldProps<T>,
    Omit<TextInputProps, "handleChange"> {
  type: HTMLInputTypeAttribute | "zip";
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  readOnly?: boolean;
  pattern?: string;
  maxLength?: number;
  wrapVariant?: "default" | "custom" | "inline" | null;
  errorMessages?: string[];
}

export const FormFieldText = observer(
  <T extends ValidationType>(rawProps: FormFieldTextProps<T>) => {
    const {
      onRecordUpdate,
      validateOn = "change",
      className,
      ...props
    } = rawProps;
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule
      );
    }

    const handleChange = (value: string) => {
      if (props.maxLength && value.length > props.maxLength) {
        return;
      }

      runInAction(() => {
        const key = props.field as keyof T;
        if (props.type === "number") {
          const num = parseFloat(value);
          if (isNaN(num)) {
            props.record[key] = "" as T[keyof T];
          } else {
            props.record[key] = parseFloat(value) as T[keyof T];
          }
        } else {
          props.record[key] = value as T[keyof T];
        }

        if (validateOn == "change") {
          setValidate(true);
        }
        if (onRecordUpdate) onRecordUpdate(props.record);
      });
    };

    const onBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (validateOn == "blur") {
        setValidate(true);
      }
      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    if (props.errorMessages) {
      errorMessages = [...errorMessages, ...props.errorMessages];
    }

    return (
      <FormFieldWrap
        {...props}
        className={className}
        variant={props.wrapVariant}
      >
        {/* TODO: drilling props like this into <input> causes lots of errors */}
        <TextInput
          {...props}
          value={props.record[props.field] as string}
          handleChange={handleChange}
          errorMessages={errorMessages}
          onBlur={onBlur}
          type={props.type == "zip" ? "number" : props.type}
        />
      </FormFieldWrap>
    );
  }
);
