import { StoreModel } from "@/models/store/StoreModel";
import { IConstant } from "@/models/types/constants";
import { SelectInput } from "@/ui/common/components/fields/SelectInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldSelectProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T> {
  options: IConstant[];
  detailWrapAppend?: React.ReactNode;
  noSearch?: boolean;
  as?: "select" | "combobox";
  showClear?: boolean;
}
export const DetailFieldSelect = observer(function DetailFieldSelect<
  T extends StoreModel & ValidationType,
>(props: DetailFieldSelectProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);
  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (value: IConstant | undefined) => {
    runInAction(() => {
      const key = props.field as keyof T;
      if (value) {
        props.record[key] = value.id as T[keyof T];
      } else {
        props.record[key] = undefined as T[keyof T];
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
        <SelectInput
          value={props.record[props.field] as string | number}
          options={props.options}
          placeholder={props.placeholder}
          handleChange={handleChange}
          errorMessages={errorMessages}
          append={append}
          noSearch={props.noSearch}
          showClear={props.showClear}
          as={props.as}
        />
      )}
    </DetailFieldWrap>
  );
});

export default DetailFieldSelect;
