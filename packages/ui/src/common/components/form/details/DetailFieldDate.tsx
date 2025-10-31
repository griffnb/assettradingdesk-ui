import {
  DateInput,
  DateInputProps,
} from "@/ui/common/components/fields/DateInput";

import { StoreModel } from "@/models/store/StoreModel";
import { ValidationType, isFieldValid } from "@/utils/validations";
import dayjs from "dayjs";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldDateProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T>,
    Omit<
      DateInputProps,
      "handleChange" | "value" | "errorMessages" | "append"
    > {
  allowClear?: boolean;
}

// Define the component with correct generic syntax
export const DetailFieldDate = observer(function DetailFieldDate<
  T extends StoreModel & ValidationType,
>(props: DetailFieldDateProps<T>) {
  const [validate, setValidate] = useState<boolean>(false);

  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (date: dayjs.Dayjs | null) => {
    runInAction(() => {
      const key = props.field as keyof T;
      props.record[key] = date as T[keyof T];
      setValidate(true);
    });
  };
  const value = props.displayField
    ? (props.record[props.displayField] as string)
    : (props.record[props.field] as string);

  return (
    <DetailFieldWrap {...props} value={value}>
      {({ append }) => (
        <DateInput
          {...props}
          value={props.record[props.field] as dayjs.Dayjs}
          handleChange={handleChange}
          errorMessages={errorMessages}
          append={append}
        />
      )}
    </DetailFieldWrap>
  );
});

export default DetailFieldDate;
