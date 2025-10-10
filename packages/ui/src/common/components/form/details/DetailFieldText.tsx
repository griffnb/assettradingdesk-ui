import { StoreModel } from "@/models/store/StoreModel";
import {
  TextInput,
  TextInputProps,
} from "@/ui/common/components/fields/TextInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import DetailFieldWrap from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldTextProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T>,
    Omit<
      TextInputProps,
      "handleChange" | "errorMessages" | "value" | "append"
    > {
  detailWrapAppend?: React.ReactNode;
}

// Define the component with correct generic syntax
const DetailFieldText = observer(
  <T extends StoreModel & ValidationType>(
    rawProps: DetailFieldTextProps<T>
  ) => {
    const { ...props } = rawProps;
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
      runInAction(() => {
        const key = props.field as keyof T;
        // TODO: This is buggy, handleChange only gets called on number inputs but the UI shows it changing
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

        setValidate(true);
      });
    };

    const value = props.displayField
      ? (props.record[props.displayField] as string)
      : (props.record[props.field] as string);

    return (
      <DetailFieldWrap {...props} value={value}>
        {({ append }) => (
          <TextInput
            {...props}
            value={props.record[props.field] as string}
            handleChange={handleChange}
            errorMessages={errorMessages}
            append={append}
          />
        )}
      </DetailFieldWrap>
    );
  }
);

export default DetailFieldText;
