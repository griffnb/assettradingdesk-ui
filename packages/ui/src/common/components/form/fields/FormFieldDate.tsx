import { DateInput } from "@/ui/common/components/fields/DateInput";

import { ValidationType, isFieldValid } from "@/utils/validations";
import dayjs from "dayjs";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FocusEvent, useState } from "react";
import { FormFieldWrap } from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldDateProps<T extends ValidationType>
  extends FormFieldProps<T> {
  icon?: string;
  displayFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  setFormat?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

// Define the component with correct generic syntax
export const FormFieldDate = observer(function FormFieldDate<
  T extends ValidationType,
>(props: FormFieldDateProps<T>) {
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
      if (props.setFormat) {
        props.record[key] = date?.format(props.setFormat) as T[keyof T];
      } else {
        props.record[key] = date as T[keyof T];
      }
      if (props.validateOn == "change") {
        setValidate(true);
      }
      if (props.onRecordUpdate) props.onRecordUpdate(props.record);
    });
  };

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (props.validateOn == "blur") {
      setValidate(true);
    }
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const value =
    typeof props.record[props.field] === "string"
      ? dayjs(props.record[props.field] as string)
      : (props.record[props.field] as dayjs.Dayjs);

  return (
    <FormFieldWrap {...props} variant={props.wrapVariant}>
      <DateInput
        value={value}
        placeholder={props.placeholder}
        handleChange={handleChange}
        errorMessages={errorMessages}
        icon={props.icon}
        displayFormat={props.displayFormat}
        append={props.append}
        prepend={props.prepend}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onBlur={onBlur}
      />
    </FormFieldWrap>
  );
});
