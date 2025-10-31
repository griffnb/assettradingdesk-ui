import { ModelSearchMultiSelectInput } from "@/ui/common/components/fields/ModelSearchMultiSelectInput";

import { Store } from "@/models/store/Store";
import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import isEmpty from "@/utils/empty";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldModelSearchMultiSelectProps<
  T extends StoreModel & ValidationType,
  V extends StoreModel,
> extends DetailFieldProps<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchParam: string;
  modelSearchFilters?: { [key: string]: string | string[] };
  idField?: keyof V;
}

// Define the component with correct generic syntax
const DetailFieldModelSearchMultiSelect = observer(
  <T extends StoreModel & ValidationType, V extends StoreModel>(
    props: DetailFieldModelSearchMultiSelectProps<T, V>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);
    const [selected, setSelected] = useState<V[] | undefined>(undefined);
    const [values, setValues] = useState<string[]>([]);

    useEffect(() => {
      if (
        props.displayField ||
        !props.record[props.field] ||
        isEmpty(props.record[props.field])
      ) {
        return;
      }

      const idField = props.idField || "id";

      Store[props.modelName]
        .queryRecords("", { [idField]: props.record[props.field] as string[] })
        .then((response) => {
          if (response.data) {
            setValues(
              ((response.data as unknown as V[]) || []).map((item) => {
                return item[props.modelDisplayField];
              }) as string[],
            );
          }
        });
    }, [props.displayField, props.modelName]);

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
        const idField = props.idField || "id";

        const key = props.field as keyof T;
        props.record[key] = values.map((value) => value[idField]) as T[keyof T];
        setValues(
          values.map((value) => value[props.modelDisplayField]) as string[],
        );
        setSelected(values);
        setValidate(true);
      });
    };

    const value = props.displayField
      ? (props.record[props.displayField] as string)
      : values.join(", ");

    return (
      <DetailFieldWrap {...props} value={value}>
        {({ append }) => (
          <ModelSearchMultiSelectInput<V>
            values={props.record[props.field] as string[]}
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
          />
        )}
      </DetailFieldWrap>
    );
  },
);

export default DetailFieldModelSearchMultiSelect;
