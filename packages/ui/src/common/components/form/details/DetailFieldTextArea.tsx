import { StoreModel } from "@/models/store/StoreModel";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TextAreaInput } from "../../fields/TextAreaInput";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldTextAreaProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T> {
  prependVal?: string;
  rows?: number;
  readOnly?: boolean;
}

// Define the component with correct generic syntax
export const DetailFieldTextArea = observer(function DetailFieldTextArea<
  T extends StoreModel & ValidationType,
>(props: DetailFieldTextAreaProps<T>) {
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
      setValidate(true);
    });
  };

  const value = props.displayField
    ? (props.record[props.displayField] as string)
    : (props.record[props.field] as string);

  return (
    <DetailFieldWrap {...props} value={value} textArea={true}>
      {({ append }) => (
        <TextAreaInput
          {...props}
          value={props.record[props.field] as string}
          handleChange={handleChange}
          errorMessages={errorMessages}
          append={append}
        />
      )}
    </DetailFieldWrap>
  );
});
