import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";

import { IConstant } from "@/models/types/constants";
import { isNumeric } from "@/utils/numbers";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { ErrorMessages } from "../../fields/base/ErrorMessages";
import { HelpText } from "../../fields/base/HelpText";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldConstantsCreatorProps<T extends ValidationType>
  extends FormFieldProps<T> {
  labelType: HTMLInputTypeAttribute;
  labelPlaceholder: string;
  valueType: HTMLInputTypeAttribute;
  valuePlaceholder: string;
  defaultValue?: string;
}

export const FormFieldConstantsCreator = observer(
  <T extends ValidationType>(props: FormFieldConstantsCreatorProps<T>) => {
    const [validate, setValidate] = useState<boolean>(false);
    const [rows, setRows] = useState<IConstant[]>([]);

    useEffect(() => {
      const recordValues = props.record[props.field] as IConstant[];

      if (!recordValues) {
        setRows([
          {
            id: "",
            label: "",
          },
        ]);
        return;
      }

      const list: IConstant[] = [];
      recordValues.forEach((row) => {
        list.push({ ...row });
      });

      if (list.length == 0) {
        list.push({
          id: "",
          label: "",
        });
      }

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

    const updateRecord = () => {
      runInAction(() => {
        props.record[props.field as keyof T] = [...rows] as T[keyof T];
        setValidate(true);
        if (props.onRecordUpdate) props.onRecordUpdate(props.record);
      });
    };

    const addRow = () => {
      setRows([
        ...rows,
        {
          id: "",
          label: props.defaultValue || "",
        },
      ]);
    };

    const updateRow = (index: number, key: "id" | "label", value: any) => {
      if (rows && rows[index]) {
        const row = rows[index];

        if (isNumeric(value)) {
          value = parseInt(value);
        }
        row[key] = value;
        rows[index] = row;
        setRows([...rows]);
        updateRecord();
      }
    };

    // remove row at index
    const removeRow = (index: number) => {
      if (rows.length > 1) {
        rows.splice(index, 1);
        setRows([...rows]);
        updateRecord();
      }
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        <div className="mb-2 flex w-full items-start justify-between gap-x-3 whitespace-nowrap">
          <div className="flex-none">Label</div>
          <div className="flex-none">Value</div>
          <div></div>
        </div>
        {rows.map((row, index) => (
          <div
            key={index}
            className="mb-2 flex w-full items-start justify-between gap-x-3 whitespace-nowrap"
          >
            <div className="flex-none">
              <input
                type={props.labelType}
                value={row.label}
                placeholder={props.labelPlaceholder}
                className="w-full min-w-[160px] flex-1 rounded-lg border-gray-200 px-4 py-[9px] text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
                onChange={(event) => {
                  updateRow(index, "label", event.target.value);
                }}
                onBlur={(event) => {
                  if (event.target.value != event.target.value.trim()) {
                    updateRow(index, "label", event.target.value.trim());
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <input
                value={row.id}
                type={props.valueType}
                placeholder={props.valuePlaceholder}
                className="w-full min-w-[160px] flex-1 rounded-lg border-gray-200 px-4 py-[9px] text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
                onChange={(event) => {
                  updateRow(index, "id", event.target.value);
                }}
                onBlur={(event) => {
                  if (event.target.value != event.target.value.trim()) {
                    updateRow(index, "id", event.target.value.trim());
                  }
                }}
              />
            </div>
            <div className="w-fit">
              <button
                type="button"
                className="size-11 rounded-lg border bg-blue-500 text-white hover:bg-blue-600"
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
        {props.helpText ? <HelpText>{props.helpText}</HelpText> : null}
      </FormFieldWrap>
    );
  }
);
