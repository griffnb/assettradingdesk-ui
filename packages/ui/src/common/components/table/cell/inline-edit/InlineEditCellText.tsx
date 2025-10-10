import { StoreModel } from "@/models/store/StoreModel";
import { TextInput } from "@/ui/common/components/fields/TextInput";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, HTMLInputTypeAttribute, useState } from "react";
import { IColumn, TableCellProps } from "../../../types/columns";
import InlineEditCellWrap from "./InlineEditCellWrap";

interface InlineEditCellTextProps<T extends ValidationType & StoreModel>
  extends TableCellProps<T> {
  column: InlineEditCellTextColumn<T>;
}

export interface InlineEditCellTextColumn<T extends object> extends IColumn<T> {
  type: HTMLInputTypeAttribute;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  inputClassName?: string;
}
const InlineEditCellText = observer(
  <T extends ValidationType & StoreModel>(
    props: InlineEditCellTextProps<T>,
  ) => {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(props.record, props.column.field);
    }

    const handleChange = (value: string) => {
      runInAction(() => {
        const key = props.column.field as keyof T;
        if (props.column.type === "number") {
          const num = parseFloat(value);
          if (isNaN(num)) {
            props.record[key] = "" as T[keyof T];
          } else {
            props.record[key] = parseFloat(value) as T[keyof T];
          }
        } else {
          props.record[key] = value as T[keyof T];
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
          <div className="w-full min-w-[200px]">
            <TextInput
              type={props.column.type}
              value={props.record[props.column.field] as string}
              handleChange={handleChange}
              errorMessages={errorMessages}
              append={append}
              inputMode={props.column.inputMode}
            />
          </div>
        )}
      </InlineEditCellWrap>
    );
  },
);

export default InlineEditCellText;
