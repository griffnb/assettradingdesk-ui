import isEmpty from "@/utils/empty";
import { ValidationType, isFieldValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import {
  HTMLInputTypeAttribute,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { ErrorMessages } from "../../fields/base/ErrorMessages";
import FormFieldWrap from "./FormFieldWrap";
import { FormFieldProps } from "./types";

interface FormFieldMapProps<T extends ValidationType>
  extends FormFieldProps<T> {
  keyType: HTMLInputTypeAttribute;
  keyPlaceholder: string;
  valueType: HTMLInputTypeAttribute | "textarea";
  valuePlaceholder: string;
  defaultValue?: string | number;
}

interface KeyValue {
  key: string;
  value: number | string;
}

const FormFieldMap = observer(
  <T extends ValidationType>(props: FormFieldMapProps<T>) => {
    const [validate, setValidate] = useState<boolean>(false);
    const [rows, setRows] = useState<KeyValue[]>([]);

    useEffect(() => {
      const recordValues = props.record[props.field] as any;

      const list: KeyValue[] = [];

      for (const key in recordValues) {
        if (Object.prototype.hasOwnProperty.call(recordValues, key)) {
          if (!isEmpty(key))
            list.push({
              key: key,
              value: recordValues[key],
            });
        }
      }

      if (list.length == 0) {
        list.push({
          key: "",
          value: "",
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
      const keyValueData: any = {};

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row && row.key != "" && row.value != "") {
          keyValueData[row.key] = row.value;
        }
      }

      runInAction(() => {
        props.record[props.field as keyof T] = keyValueData as T[keyof T];
        setValidate(true);
      });
    };

    const addRow = () => {
      setRows([
        ...rows,
        {
          key: "",
          value: props.defaultValue || "",
        },
      ]);
    };

    const updateRow = (index: number, key: keyof KeyValue, value: any) => {
      if (rows && rows[index]) {
        const row = rows[index] as KeyValue;

        if (props.valueType === "number" && key == "value") {
          row[key] = parseFloat(value);
        } else {
          row[key] = value;
        }

        rows[index] = row as KeyValue;
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

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        // Prevent default form submit behavior
        event.stopPropagation();
      }
    };

    return (
      <FormFieldWrap {...props} variant={props.wrapVariant}>
        {rows.map((row, index) => (
          <div
            key={index}
            className="mb-2 flex w-full items-start justify-between gap-x-3 whitespace-nowrap border-b border-gray-200 pb-2"
          >
            <div className="flex-none">
              <input
                type={props.keyType}
                value={row.key}
                placeholder={props.keyPlaceholder}
                className="w-full min-w-[160px] flex-1 rounded-lg border-gray-200 px-4 py-[9px] text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
                onChange={(event) => {
                  updateRow(index, "key", event.target.value);
                }}
                onBlur={(event) => {
                  updateRow(index, "key", event.target.value.trim());
                }}
              />
            </div>
            <div className="flex-1">
              {(() => {
                switch (props.valueType) {
                  case "textarea":
                    return (
                      <textarea
                        value={row.value}
                        placeholder={props.valuePlaceholder}
                        className="w-full min-w-[160px] flex-1 rounded-lg border-gray-200 px-4 py-[9px] text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
                        rows={5}
                        onKeyDown={handleKeyDown}
                        onChange={(event) => {
                          updateRow(index, "value", event.target.value);
                        }}
                        onBlur={(event) => {
                          updateRow(index, "value", event.target.value.trim());
                        }}
                      />
                    );

                  default:
                    return (
                      <input
                        value={row.value}
                        type={props.valueType}
                        placeholder={props.valuePlaceholder}
                        className="w-full min-w-[160px] flex-1 rounded-lg border-gray-200 px-4 py-[9px] text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
                        onChange={(event) => {
                          updateRow(index, "value", event.target.value);
                        }}
                        onBlur={(event) => {
                          updateRow(index, "value", event.target.value.trim());
                        }}
                      />
                    );
                }
              })()}
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

export default FormFieldMap;
