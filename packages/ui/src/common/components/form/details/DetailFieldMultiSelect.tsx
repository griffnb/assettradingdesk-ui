import { StoreModel } from "@/models/store/StoreModel";
import { IConstant } from "@/models/types/constants";
import { MultiSelectInput } from "@/ui/common/components/fields/MultiSelectInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldMultiSelectProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T> {
  options: IConstant[];
}
export const DetailFieldMultiSelect = observer(function DetailFieldMultiSelect<
  T extends StoreModel & ValidationType,
>(props: DetailFieldMultiSelectProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);

  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (value: IConstant[]) => {
    runInAction(() => {
      const key = props.field as keyof T;
      props.record[key] = value.map((v) => v.id) as T[keyof T];
      setValidate(true);
    });
  };

  const value = props.displayField
    ? (props.record[props.displayField] as string)
    : props.options
        .map((option) => {
          const key = props.field as keyof T;
          return (props.record[key] as (string | number)[])?.includes(option.id)
            ? option.label
            : "";
        })
        .filter((val) => val != "")
        .join(", ");

  return (
    <DetailFieldWrap {...props} value={value}>
      {({ append }) => (
        <MultiSelectInput
          values={props.record[props.field] as (string | number)[]}
          options={props.options}
          placeholder={props.placeholder}
          handleChange={handleChange}
          errorMessages={errorMessages}
          append={append}
        />
      )}
    </DetailFieldWrap>
  );
});
