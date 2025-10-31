import { ModelSearchMultiSelectInput } from "@/ui/common/components/fields/ModelSearchMultiSelectInput";

import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormFieldWrap } from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldModelSearchMultiSelectProps<
  T extends ValidationType,
  V extends StoreModel,
> extends FormFieldProps<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchParam: string;
  modelSearchFilters?: { [key: string]: string | string[] };
  noSearch?: boolean;
  as?: "select" | "combobox";
  onValueUpdate?: (record: T, value: V[]) => void;
  idField?: keyof V;
}

// Define the component with correct generic syntax
export const FormFieldModelSearchMultiSelect = observer(
  function FormFieldModelSearchMultiSelect<
    T extends ValidationType,
    V extends StoreModel,
  >(props: FormFieldModelSearchMultiSelectProps<T, V>) {
    const [validate, setValidate] = useState<boolean>(false);
    const [selected, setSelected] = useState<V[] | undefined>(undefined);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule,
      );
    }

    const handleChange = (values: V[]) => {
      runInAction(() => {
        const key = props.field as keyof T;
        const idField = props.idField || "id";

        props.record[key] = values.map((value) => value[idField]) as T[keyof T];
        setSelected(values);
        setValidate(true);
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
        if (props.onValueUpdate) props.onValueUpdate(props.record, values);
      });
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <ModelSearchMultiSelectInput<V>
          {...props}
          values={props.record[props.field] as string[]}
          handleChange={handleChange}
          errorMessages={errorMessages}
          selected={selected}
          idField={props.idField}
        />
      </FormFieldWrap>
    );
  },
);
