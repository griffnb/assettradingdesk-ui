import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelSearchMultiSelectInput } from "@/ui/common/components/fields/ModelSearchMultiSelectInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IColumn, TableCellProps } from "../../../types/columns";
import InlineEditCellWrap from "./InlineEditCellWrap";

interface InlineEditCellModelSearchMultiSelectProps<
  T extends ValidationType & StoreModel,
  V extends StoreModel,
> extends TableCellProps<T> {
  column: InlineEditCellModelSearchMultiSelectColumn<T, V>;
}

export interface InlineEditCellModelSearchMultiSelectColumn<T extends object, V>
  extends IColumn<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchParam: string;
  modelSearchFilters?: { [key: string]: string | string[] };
}
const InlineEditCellModelSearchMultiSelect = observer(
  <T extends ValidationType & StoreModel, V extends StoreModel>(
    props: InlineEditCellModelSearchMultiSelectProps<T, V>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);
    const [selected, setSelected] = useState<V[] | undefined>(undefined);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(props.record, props.column.field);
    }

    const handleChange = (values: V[]) => {
      runInAction(() => {
        const key = props.column.field as keyof T;
        props.record[key] = values.map((value) => value.id) as T[keyof T];
        setSelected(values);
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
            <ModelSearchMultiSelectInput<V>
              values={props.record[props.column.field] as string[]}
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

export default InlineEditCellModelSearchMultiSelect;
