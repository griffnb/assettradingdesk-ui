import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelSearchSelectInput } from "@/ui/common/components/fields/ModelSearchSelectInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IColumn, TableCellProps } from "../../../types/columns";
import InlineEditCellWrap from "./InlineEditCellWrap";

interface InlineEditCellModelSearchSelectProps<
  T extends ValidationType & StoreModel,
  V extends StoreModel,
> extends TableCellProps<T> {
  column: InlineEditCellModelSearchSelectColumn<T, V>;
}

export interface InlineEditCellModelSearchSelectColumn<T extends object, V>
  extends IColumn<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchParam: string;
  modelSearchFilters?: { [key: string]: string | string[] };
}
const InlineEditCellModelSearchSelect = observer(
  <T extends ValidationType & StoreModel, V extends StoreModel>(
    props: InlineEditCellModelSearchSelectProps<T, V>,
  ) => {
    const [selected, setSelected] = useState<V | undefined>(undefined);
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(props.record, props.column.field);
    }
    const handleChange = (value: V | undefined) => {
      runInAction(() => {
        const key = props.column.field as keyof T;
        if (value) {
          props.record[key] = value.id as T[keyof T];
          setSelected(value);
        } else {
          props.record[key] = undefined as T[keyof T];
        }
        setValidate(true);
      });
    };

    return (
      <InlineEditCellWrap<T>
        record={props.record}
        field={props.column.field}
        displayField={props.column.displayField}
      >
        {({ append }) => (
          <div className="w-full min-w-[300px]">
            <ModelSearchSelectInput<V>
              value={props.record[props.column.field] as string}
              modelName={props.column.modelName}
              modelDisplayField={props.column.modelDisplayField}
              modelSearchFilters={props.column.modelSearchFilters}
              modelSearchParam={props.column.modelSearchParam}
              handleChange={handleChange}
              errorMessages={errorMessages}
              selected={selected}
              append={append}
            />
          </div>
        )}
      </InlineEditCellWrap>
    );
  },
);

export default InlineEditCellModelSearchSelect;
