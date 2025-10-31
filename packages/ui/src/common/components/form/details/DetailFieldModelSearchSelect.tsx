import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelSearchSelectInput } from "@/ui/common/components/fields/ModelSearchSelectInput";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldModelSearchSelectProps<
  T extends StoreModel & ValidationType,
  V extends StoreModel,
> extends DetailFieldProps<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchParam: string;
  modelSearchFilters?: { [key: string]: string | string[] };
  idField?: keyof V;
  showClear?: boolean | undefined;
}

// Define the component with correct generic syntax
export const DetailFieldModelSearchSelect = observer(
  function DetailFieldModelSearchSelect<
    T extends StoreModel & ValidationType,
    V extends StoreModel,
  >(props: DetailFieldModelSearchSelectProps<T, V>) {
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
          setSelected(value);
        } else {
          props.record[key] = null as T[keyof T];
          setSelected(undefined);
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
          <ModelSearchSelectInput<V>
            value={props.record[props.field] as string}
            modelName={props.modelName}
            modelDisplayField={props.modelDisplayField}
            modelSearchFilters={props.modelSearchFilters}
            modelSearchParam={props.modelSearchParam}
            placeholder={props.placeholder}
            handleChange={handleChange}
            errorMessages={errorMessages}
            selected={selected}
            append={append}
            idField={props.idField}
            showClear={props.showClear}
          />
        )}
      </DetailFieldWrap>
    );
  },
);

export default DetailFieldModelSearchSelect;
