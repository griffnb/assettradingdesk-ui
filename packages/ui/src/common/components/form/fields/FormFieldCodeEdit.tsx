import { ValidationType, isFieldValid } from "@/common_lib/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FocusEvent, useState } from "react";
import { CodeEdit, CodeEditProps } from "../CodeEdit";
import { FormFieldWrap } from "./FormFieldWrap";
import { BaseFormFieldProps } from "./types";

interface FormFieldCodeEditProps<T extends ValidationType>
  extends
    Omit<BaseFormFieldProps, "onBlur">,
    Omit<CodeEditProps, "onChange" | "value" | "errorMessages"> {
  record: T;
  field: string & keyof T;
  rows?: number;
  noExpand?: boolean;
  onRecordUpdate?: (record: T) => void;
  wrapSize?: "default" | "full";
  inputRef?: React.Ref<HTMLTextAreaElement>;
  onBlur?: (
    event: FocusEvent<HTMLDivElement> & FocusEvent<HTMLTextAreaElement>,
  ) => void;

  isJson?: boolean;
}

// Define the component with correct generic syntax
export const FormFieldCodeEdit = observer(
  <T extends ValidationType>(props: FormFieldCodeEditProps<T>) => {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule,
      );
    }

    const handleChange = (value: string) => {
      runInAction(() => {
        const key = props.field as keyof T;

        if (props.isJson) {
          try {
            props.record[key] = JSON.parse(value) as T[keyof T];
          } catch {
            props.record[key] = value as T[keyof T];
          }
        } else {
          props.record[key] = value as T[keyof T];
        }
        if (props.validateOn == "change") {
          setValidate(true);
        }
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
      });
    };

    const onBlur = (
      event: FocusEvent<HTMLDivElement> & FocusEvent<HTMLTextAreaElement>,
    ) => {
      if (props.validateOn == "blur") {
        setValidate(true);
      }
      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    const value =
      typeof props.record[props.field] === "string"
        ? (props.record[props.field] as string)
        : JSON.stringify(props.record[props.field], null, 2);

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <CodeEdit
          {...props}
          value={value}
          onChange={handleChange}
          errorMessages={errorMessages}
          onBlur={onBlur}
        />
      </FormFieldWrap>
    );
  },
);
