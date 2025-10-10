import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { ModelSelectInput } from "@/ui/common/components/fields/ModelSelectInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IColumn, TableCellProps } from "../../../types/columns";
import InlineEditCellWrap from "./InlineEditCellWrap";

interface InlineEditCellModelSelectProps<
  T extends ValidationType & StoreModel,
  V extends StoreModel,
> extends TableCellProps<T> {
  column: InlineEditCellModelSelectColumn<T, V>;
}

export interface InlineEditCellModelSelectColumn<T extends object, V>
  extends IColumn<T> {
  modelName: StoreKeys;
  modelDisplayField: keyof V;
  modelSearchField: keyof V;
  modelSearchFilters?: { [key: string]: string | string[] };
}
const InlineEditCellModelSelect = observer(
  <T extends ValidationType & StoreModel, V extends StoreModel>(
    props: InlineEditCellModelSelectProps<T, V>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(props.record, props.column.field);
    }

    const handleChange = (value: V | undefined) => {
      runInAction(() => {
        const key = props.column.field;
        if (!value) {
          props.record[key] = undefined as T[keyof T];
        } else {
          props.record[key] = value.id as T[keyof T];
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
            <ModelSelectInput<V>
              value={props.record[props.column.field] as string}
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

export default InlineEditCellModelSelect;
