import TextAreaInput, {
  TextAreaInputProps,
} from "@/ui/common/components/fields/TextAreaInput";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FocusEvent, useState } from "react";
import { FormFieldWrap } from "./FormFieldWrap";
import { BaseFormFieldProps } from "./types";

interface FormFieldTextAreaProps<T extends ValidationType>
  extends BaseFormFieldProps,
    Omit<TextAreaInputProps, "handleChange"> {
  record: T;
  field: string & keyof T;
  rows?: number;
  noExpand?: boolean;
  onRecordUpdate?: (record: T) => void;
  wrapSize?: "default" | "full";
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

// Define the component with correct generic syntax
export const FormFieldTextArea = observer(
  <T extends ValidationType>(props: FormFieldTextAreaProps<T>) => {
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
        props.record[key] = value as T[keyof T];
        if (props.validateOn == "change") {
          setValidate(true);
        }
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
      });
    };

    const onBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      if (props.validateOn == "blur") {
        setValidate(true);
      }
      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <TextAreaInput
          {...props}
          value={props.record[props.field] as string}
          placeholder={props.placeholder}
          handleChange={handleChange}
          errorMessages={errorMessages}
          noExpand={props.noExpand}
          onBlur={onBlur}
        />
      </FormFieldWrap>
    );
  },
);
