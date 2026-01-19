import { isFieldValid, ValidationType } from "@/common_lib/utils/validations";
import { StoreModel } from "@/models/store/StoreModel";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Tag, TagInputBase } from "../../fields/base/TagInputBase";
import { getColumnValue } from "../../table/cell/helpers";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldTagInputProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T> {}
export const DetailFieldTagInput = observer(function DetailFieldTagInput<
  T extends StoreModel & ValidationType,
>(props: DetailFieldTagInputProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);

  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (value: Tag[]) => {
    runInAction(() => {
      const key = props.field as keyof T;
      props.record[key] = value as T[keyof T];
      setValidate(true);
    });
  };

  const value = props.displayField
    ? (getColumnValue(props.record, props.displayField) as string)
    : (props.record[props.field] as string);

  return (
    <DetailFieldWrap {...props} value={value}>
      {({ append }) => (
        <TagInputBase
          tags={props.record[props.field] as Tag[]}
          placeholder={props.placeholder}
          handleChange={handleChange}
          errorMessages={errorMessages}
          append={append}
        />
      )}
    </DetailFieldWrap>
  );
});
