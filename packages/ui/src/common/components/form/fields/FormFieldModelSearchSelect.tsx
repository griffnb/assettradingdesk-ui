import { StoreModel } from "@/models/store/StoreModel";
import { IConstant } from "@/models/types/constants";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelSearchSelectInput } from "@/ui/common/components/fields/ModelSearchSelectInput";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormFieldWrap } from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldModelSearchSelectProps<
  T extends ValidationType,
  V extends StoreModel,
> extends FormFieldProps<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchParam: string;
  modelSearchFilters?: { [key: string]: string | string[] };
  showClear?: boolean;
  noSearch?: boolean;
  as?: "select" | "combobox";
  additionalOptions?: IConstant[];
  onValueUpdate?: (record: T, value: V | undefined) => void;
  idField?: keyof V;
}

// Define the component with correct generic syntax
export const FormFieldModelSearchSelect = observer(
  function FormFieldModelSearchSelect<
    T extends ValidationType,
    V extends StoreModel,
  >(props: FormFieldModelSearchSelectProps<T, V>) {
    const [selected, setSelected] = useState<V | undefined>(undefined);
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
        const idField = props.idField || "id";

        if (value) {
          props.record[key] = value[idField] as T[keyof T];
        } else {
          props.record[key] = null as T[keyof T];
        }
        setSelected(value);
        setValidate(true);
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
        if (props.onValueUpdate) props.onValueUpdate(props.record, value);
      });
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <ModelSearchSelectInput<V>
          {...props}
          value={props.record[props.field] as string}
          handleChange={handleChange}
          errorMessages={errorMessages}
          selected={selected}
          idField={props.idField}
        />
      </FormFieldWrap>
    );
  },
);
