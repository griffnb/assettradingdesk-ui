import isEmpty from "@/utils/empty";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { ErrorMessages } from "../../fields/base/ErrorMessages";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldArrayProps<T extends ValidationType>
  extends FormFieldProps<T> {
  valueType: HTMLInputTypeAttribute;
  valuePlaceholder: string;
}
const FormFieldArray = observer(
  <T extends ValidationType>(props: FormFieldArrayProps<T>) => {
    const [validate, setValidate] = useState<boolean>(false);
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
      const recordValues = props.record[props.field] as any[];

      const list: any[] = [];

      for (let i = 0; i < recordValues.length; i++) {
        const value = recordValues[i];
        if (!isEmpty(value)) list.push(value);
      }

      if (list.length == 0) list.push("");

      setRows(list);
    }, [props.record, props.field]);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule
      );
    }

    const updateRecord = (index: number, value: any) => {
      rows[index] = value;
      const list: any[] = [];
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row != "") {
          list.push(row);
        }
      }

      setRows([...list]);

      runInAction(() => {
        props.record[props.field as keyof T] = list as T[keyof T];
        setValidate(true);
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
      });
    };

    const addRow = () => {
      setRows([...rows, ""]);
    };

    // remove row at index
    const removeRow = (index: number) => {
      if (rows.length > 1) {
        rows.splice(index, 1);
        setRows([...rows]);
        runInAction(() => {
          props.record[props.field as keyof T] = rows as T[keyof T];
        });
      }
    };

    return (
      <FormFieldWrap
        field={props.field}
        label={props.label}
        required={props.required}
      >
        {rows.map((row, index) => (
          <div
            key={index}
            className="mb-2 flex w-full items-center justify-between gap-x-3 whitespace-nowrap"
          >
            <div className="flex-1">
              <input
                type={props.valueType}
                value={row}
                placeholder={props.valuePlaceholder}
                className="w-full min-w-[160px] flex-1 rounded-lg border-gray-200 px-4 py-[9px] text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
                onChange={(event) => {
                  updateRecord(index, event.target.value);
                }}
                onBlur={(event) => {
                  if (event.target.value != event.target.value.trim()) {
                    updateRecord(index, event.target.value.trim());
                  }
                }}
              />
            </div>
            <div className="w-fit">
              <button
                type="button"
                className="size-11 rounded-lg border bg-blue-dark-500 text-white hover:bg-blue-dark-600"
                onClick={addRow}
              >
                <i className="fa fa-plus" />
              </button>
              <button
                type="button"
                className="size-11 rounded-lg border bg-gray-400 text-white hover:bg-gray-500"
                onClick={() => {
                  removeRow(index);
                }}
              >
                <i className="fa fa-minus" />
              </button>
            </div>
          </div>
        ))}
        {errorMessages.length > 0 && (
          <ErrorMessages errorMessages={errorMessages} />
        )}
      </FormFieldWrap>
    );
  }
);

export default FormFieldArray;
