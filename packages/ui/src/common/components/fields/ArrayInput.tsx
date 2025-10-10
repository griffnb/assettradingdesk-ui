import { observer } from "mobx-react-lite";
import { HTMLInputTypeAttribute, ReactNode } from "react";

import { ErrorMessages } from "./base/ErrorMessages";
import { HelpText } from "./base/HelpText";

export interface ArrayInputProps {
  values: any[];
  valueType?: HTMLInputTypeAttribute;
  valuePlaceholder?: string;
  errorMessages: string[];
  onUpdate(values: any[]): void;
  helpText?: ReactNode;
  append?: ReactNode;
}
export const ArrayInput = observer((rawProps: ArrayInputProps) => {
  const { valueType = "text", ...props } = rawProps;

  const updateRecord = (index: number, value: any) => {
    const values = [...props.values];

    if (valueType === "number") {
      const num = parseFloat(value);
      if (isNaN(num)) {
        values[index] = "";
      } else {
        values[index] = num;
      }
    } else {
      values[index] = value;
    }

    const list: any[] = [];
    for (let i = 0; i < values.length; i++) {
      const row = values[i];
      if (row != "") {
        list.push(row);
      }
    }

    props.onUpdate(list);
  };

  const addRow = () => {
    props.onUpdate([...props.values, ""]);
  };

  // remove row at index
  const removeRow = (index: number) => {
    const values = props.values;
    if (values.length > 1) {
      values.splice(index, 1);

      props.onUpdate([...values]);
    }
  };

  const hasErrors = props.errorMessages.length > 0;

  const values = props.values;
  if (values.length === 0) {
    values.push("");
  }

  return (
    <div className={`group flex flex-col ${hasErrors ? "errors" : ""}`}>
      {values.map((row, index) => (
        <div
          key={index}
          className="mb-2 flex w-full items-center justify-between gap-x-3 whitespace-nowrap"
        >
          <div className="flex-1">
            <input
              type={valueType}
              value={row}
              placeholder={props.valuePlaceholder}
              className="w-full min-w-[160px] flex-1 rounded-lg border-gray-200 px-4 py-[9px] text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
              onChange={(event) => {
                updateRecord(index, event.target.value);
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
      {props.helpText ? <HelpText>{props.helpText}</HelpText> : null}

      {props.errorMessages && props.errorMessages?.length > 0 && (
        <ErrorMessages errorMessages={props.errorMessages} />
      )}
    </div>
  );
});
