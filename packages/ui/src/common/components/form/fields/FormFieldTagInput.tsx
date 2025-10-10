import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Tag, TagInputBase } from "../../fields/base/TagInputBase";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

// Define the component with correct generic syntax
const FormFieldTagInput = observer(
  <T extends ValidationType>(props: FormFieldProps<T>) => {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule
      );
    }

    const handleChange = (value: Tag[]) => {
      runInAction(() => {
        const key = props.field as keyof T;
        props.record[key] = value as T[keyof T];
        setValidate(true);
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
      });
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <TagInputBase
          tags={props.record[props.field] as (string | number)[]}
          placeholder={props.placeholder}
          handleChange={handleChange}
          errorMessages={errorMessages}
        />
      </FormFieldWrap>
    );
  }
);

export default FormFieldTagInput;
