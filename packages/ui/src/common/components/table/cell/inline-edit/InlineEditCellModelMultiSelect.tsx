import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelMultiSelectInput } from "@/ui/common/components/fields/ModelMultiSelectInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IColumn, TableCellProps } from "../../../types/columns";
import InlineEditCellWrap from "./InlineEditCellWrap";

interface InlineEditCellModelMultiSelectProps<
  T extends ValidationType & StoreModel,
  V extends StoreModel,
> extends TableCellProps<T> {
  column: InlineEditCellModelMultiSelectColumn<T, V>;
}

export interface InlineEditCellModelMultiSelectColumn<T extends object, V>
  extends IColumn<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchField: keyof V;
  modelSearchFilters?: { [key: string]: string | string[] };
}
const InlineEditCellModelMultiSelect = observer(
  <T extends ValidationType & StoreModel, V extends StoreModel>(
    props: InlineEditCellModelMultiSelectProps<T, V>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(props.record, props.column.field);
    }

    const handleChange = (values: V[]) => {
      runInAction(() => {
        const key = props.column.field as keyof T;
        props.record[key] = values.map((value) => value.id) as T[keyof T];
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
            <ModelMultiSelectInput<V>
              values={props.record[props.column.field] as string[]}
              modelName={props.column.modelName}
              modelDisplayField={props.column.modelDisplayField}
              modelSearchFilters={props.column.modelSearchFilters}
              modelSearchField={props.column.modelSearchField}
              handleChange={handleChange}
              errorMessages={errorMessages}
              append={append}
            />
          </div>
        )}
      </InlineEditCellWrap>
    );
  },
);

export default InlineEditCellModelMultiSelect;
