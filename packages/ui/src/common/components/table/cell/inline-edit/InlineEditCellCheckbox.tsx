import { StoreModel } from "@/models/store/StoreModel";
import { CheckboxInput } from "@/ui/common/components/fields/CheckboxInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IColumn, TableCellProps } from "../../../types/columns";
import InlineEditCellWrap from "./InlineEditCellWrap";

interface InlineEditCellCheckboxProps<T extends ValidationType & StoreModel>
  extends TableCellProps<T> {
  column: InlineEditCellCheckboxColumn<T>;
}

export interface InlineEditCellCheckboxColumn<T extends object>
  extends IColumn<T> {}

// Define the component with correct generic syntax
export const InlineEditCellCheckbox = observer(
  <T extends ValidationType & StoreModel>(
    props: InlineEditCellCheckboxProps<T>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);
    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(props.record, props.column.field);
    }

    const handleChange = (value: string | number | boolean) => {
      runInAction(() => {
        const key = props.column.field as keyof T;
        props.record[key] = value as T[keyof T];
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
          <div className="w-full min-w-[200px]">
            <CheckboxInput
              value={props.record[props.column.field] as number}
              checkedValue={1}
              uncheckedValue={0}
              handleChange={handleChange}
              errorMessages={errorMessages}
              append={append}
              inlineEdit={true}
            />
          </div>
        )}
      </InlineEditCellWrap>
    );
  },
);
