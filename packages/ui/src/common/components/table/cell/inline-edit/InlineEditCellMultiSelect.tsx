import { isFieldValid, ValidationType } from "@/common_lib/utils/validations";
import { StoreModel } from "@/models/store/StoreModel";
import { IConstant } from "@/models/types/constants";
import { MultiSelectInput } from "@/ui/common/components/fields/MultiSelectInput";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IFieldColumn, TableCellProps } from "../../../types/columns";
import { InlineEditCellWrap } from "./InlineEditCellWrap";

interface InlineEditCellMultiSelectProps<T extends ValidationType & StoreModel>
  extends TableCellProps<T> {
  column: InlineEditCellMultiSelectColumn<T>;
}

export interface InlineEditCellMultiSelectColumn<T extends object>
  extends IFieldColumn<T> {
  options: IConstant[];
}
export const InlineEditCellMultiSelect = observer(
  function InlineEditCellMultiSelect<T extends ValidationType & StoreModel>(
    props: InlineEditCellMultiSelectProps<T>,
  ) {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(props.record, props.column.field);
    }

    const handleChange = (value: IConstant[]) => {
      runInAction(() => {
        const key = props.column.field;
        props.record[key] = value.map((v) => v.id) as T[keyof T];
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
            <MultiSelectInput
              values={props.record[props.column.field] as (string | number)[]}
              options={props.column.options}
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

export default InlineEditCellMultiSelect;
