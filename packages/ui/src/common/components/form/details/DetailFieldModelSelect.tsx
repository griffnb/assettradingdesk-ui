import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelSelectInput } from "@/ui/common/components/fields/ModelSelectInput";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldModelSelectProps<
  T extends StoreModel & ValidationType,
  V extends StoreModel,
> extends DetailFieldProps<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchField: keyof V;
  modelSearchFilters?: { [key: string]: string | string[] };
  showClear?: boolean | undefined;
  readOnly?: boolean;
  idField?: keyof V;
}

// Define the component with correct generic syntax
export const DetailFieldModelSelect = observer(function DetailFieldModelSelect<
  T extends StoreModel & ValidationType,
  V extends StoreModel,
>(props: DetailFieldModelSelectProps<T, V>) {
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
      setValidate(true);
    });
  };

  const value = props.displayField
    ? (props.record[props.displayField] as string)
    : (props.record[props.field] as string);

  return (
    <DetailFieldWrap {...props} value={value}>
      {({ append }) => (
        <ModelSelectInput<V>
          {...props}
          value={props.record[props.field] as string}
          handleChange={handleChange}
          errorMessages={errorMessages}
          append={append}
        />
      )}
    </DetailFieldWrap>
  );
});

export default DetailFieldModelSelect;
