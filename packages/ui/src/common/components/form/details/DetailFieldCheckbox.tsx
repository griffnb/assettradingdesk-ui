import { StoreModel } from "@/models/store/StoreModel";
import { CheckboxInput } from "@/ui/common/components/fields/CheckboxInput";
import { isNumeric } from "@/utils/numbers";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import DetailFieldWrap from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldCheckboxProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T> {
  detailWrapAppend?: React.ReactNode;
}

// Define the component with correct generic syntax
export const DetailFieldCheckbox = observer(
  <T extends StoreModel & ValidationType>(
    props: DetailFieldCheckboxProps<T>
  ) => {
    const [validate, setValidate] = useState<boolean>(false);
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
      });
    };

    let value = props.displayField
      ? (props.record[props.displayField] as string)
      : props.record[props.field];

    if (isNumeric(value)) {
      value = value === 1 ? "Yes" : "No";
    }

    return (
      <DetailFieldWrap {...props} value={value as string}>
        {({ append }) => (
          <CheckboxInput
            label={props.label}
            value={props.record[props.field] as number}
            checkedValue={1}
            uncheckedValue={0}
            handleChange={handleChange}
            errorMessages={errorMessages}
            append={append}
            inlineEdit={true}
            className="pl-4"
          />
        )}
      </DetailFieldWrap>
    );
  }
);
