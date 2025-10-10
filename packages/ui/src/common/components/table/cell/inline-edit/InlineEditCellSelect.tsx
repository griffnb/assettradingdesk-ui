import { StoreModel } from "@/models/store/StoreModel";
import { IConstant } from "@/models/types/constants";
import { SelectInput } from "@/ui/common/components/fields/SelectInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IColumn, TableCellProps } from "../../../types/columns";
import InlineEditCellWrap from "./InlineEditCellWrap";

interface InlineEditCellSelectProps<T extends ValidationType & StoreModel>
  extends TableCellProps<T> {
  column: InlineEditCellSelectColumn<T>;
}

export interface InlineEditCellSelectColumn<T extends object>
  extends IColumn<T> {
  options: IConstant[];
}
const InlineEditCellSelect = observer(
  <T extends ValidationType & StoreModel>(
    props: InlineEditCellSelectProps<T>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(props.record, props.column.field);
    }

    const handleChange = (value: IConstant | undefined) => {
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
          <SelectInput
            value={props.record[props.column.field] as string | number}
            options={props.column.options}
            handleChange={handleChange}
            errorMessages={errorMessages}
            append={append}
          />
        )}
      </InlineEditCellWrap>
    );
  },
);

export default InlineEditCellSelect;
