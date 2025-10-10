import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelMultiSelectInput } from "@/ui/common/components/fields/ModelMultiSelectInput";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldModelMultiSelectProps<
  T extends ValidationType,
  V extends StoreModel,
> extends FormFieldProps<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchField: keyof V;
  modelSearchFilters?: { [key: string]: string | string[] };
  noSearch?: boolean;
  as?: "select" | "combobox";
  onValueUpdate?: (record: T, value: V[]) => void;
}

// Define the component with correct generic syntax
const FormFieldModelMultiSelect = observer(
  <T extends ValidationType, V extends StoreModel>(
    props: FormFieldModelMultiSelectProps<T, V>
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

    const handleChange = (values: V[]) => {
      runInAction(() => {
        const key = props.field as keyof T;
        props.record[key] = values.map((value) => value.id) as T[keyof T];
        setValidate(true);
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
        if (props.onValueUpdate) props.onValueUpdate(props.record, values);
      });
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <ModelMultiSelectInput<V>
          {...props}
          values={props.record[props.field] as string[]}
          handleChange={handleChange}
          errorMessages={errorMessages}
        />
      </FormFieldWrap>
    );
  }
);

export default FormFieldModelMultiSelect;
