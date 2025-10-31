import { Store } from "@/models/store/Store";
import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelMultiSelectInput } from "@/ui/common/components/fields/ModelMultiSelectInput";
import isEmpty from "@/utils/empty";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { DetailFieldWrap } from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface DetailFieldModelMultiSelectProps<
  T extends StoreModel & ValidationType,
  V extends StoreModel,
> extends DetailFieldProps<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchField: keyof V;
  modelSearchFilters?: { [key: string]: string | string[] };
}

//TODO need to make this load in the models properly to display them, along with the Search Multi Select
const DetailFieldModelMultiSelect = observer(
  <T extends StoreModel & ValidationType, V extends StoreModel>(
    props: DetailFieldModelMultiSelectProps<T, V>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);

    const [values, setValues] = useState<string[]>([]);

    useEffect(() => {
      if (
        props.displayField ||
        !props.record[props.field] ||
        isEmpty(props.record[props.field])
      ) {
        return;
      }

      Store[props.modelName]
        .queryRecords("", { id: props.record[props.field] as string[] })
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
        const key = props.field as keyof T;
        props.record[key] = values.map((value) => value.id) as T[keyof T];
        setValues(
          values.map((value) => value[props.modelDisplayField]) as string[],
        );
        setValidate(true);
      });
    };

    const value = props.displayField
      ? (props.record[props.displayField] as string)
      : values.join(", ");

    return (
      <DetailFieldWrap {...props} value={value}>
        {({ append }) => (
          <ModelMultiSelectInput<V>
            values={props.record[props.field] as string[]}
            modelName={props.modelName}
            modelDisplayField={props.modelDisplayField}
            modelSearchFilters={props.modelSearchFilters}
            modelSearchField={props.modelSearchField}
            placeholder={props.placeholder}
            handleChange={handleChange}
            errorMessages={errorMessages}
            append={append}
          />
        )}
      </DetailFieldWrap>
    );
  },
);

export default DetailFieldModelMultiSelect;
