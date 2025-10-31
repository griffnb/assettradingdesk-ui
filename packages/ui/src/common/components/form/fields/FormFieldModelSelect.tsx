import { StoreModel } from "@/models/store/StoreModel";
import { IConstant } from "@/models/types/constants";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelSelectInput } from "@/ui/common/components/fields/ModelSelectInput";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormFieldWrap } from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldModelSelectProps<
  T extends ValidationType,
  V extends StoreModel,
> extends FormFieldProps<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchField: keyof V;
  modelSearchFilters?: { [key: string]: string | string[] };
  showClear?: boolean;
  noSearch?: boolean;
  fitContent?: boolean;
  as?: "select" | "combobox";
  additionalOptions?: IConstant[];
  onValueUpdate?: (record: T, value: V | undefined) => void;
}

// Define the component with correct generic syntax
export const FormFieldModelSelect = observer(function FormFieldModelSelect<
  T extends ValidationType,
  V extends StoreModel,
>(props: FormFieldModelSelectProps<T, V>) {
  const [validate, setValidate] = useState<boolean>(false);

  let errorMessages: string[] = [];
  if (props.record.tryValidation || validate) {
    errorMessages = isFieldValid<T>(
      props.record,
      props.field,
      props.validationRule,
    );
  }

  const handleChange = (value: V | undefined) => {
    runInAction(() => {
      const key = props.field as keyof T;
      if (value) {
        props.record[key] = value.id as T[keyof T];
      } else {
        props.record[key] = null as T[keyof T];
      }
      setValidate(true);
      if (props.onRecordUpdate) props.onRecordUpdate(props.record);
      if (props.onValueUpdate) props.onValueUpdate(props.record, value);
    });
  };

  return (
    <FormFieldWrap {...props} variant={props.wrapVariant}>
      <ModelSelectInput<V>
        {...props}
        value={props.record[props.field] as string}
        handleChange={handleChange}
        errorMessages={errorMessages}
      />
    </FormFieldWrap>
  );
});

export default FormFieldModelSelect;
