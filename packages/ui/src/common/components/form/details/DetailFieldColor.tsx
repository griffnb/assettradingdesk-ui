import { StoreModel } from "@/models/store/StoreModel";
import { isFieldValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { CSSProperties, useState } from "react";
import { ColorInput } from "../../fields/ColorInput";
import DetailFieldWrap from "./DetailFieldWrap";
import { DetailFieldProps } from "./types";

interface CustomCSSProperties extends CSSProperties {
  "--custom-color"?: string;
}

interface DetailFieldColorProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T> {}

// Define the component with correct generic syntax
export const DetailFieldColor = observer(
  <T extends StoreModel & ValidationType>(props: DetailFieldColorProps<T>) => {
    const [validate, setValidate] = useState<boolean>(false);

    let errorMessages: string[] = [];
    if (props.record.tryValidation || validate) {
      errorMessages = isFieldValid<T>(
        props.record,
        props.field,
        props.validationRule
      );
    }

    const handleChange = (color: string) => {
      runInAction(() => {
        const key = props.field as keyof T;
        props.record[key] = color as T[keyof T];
        setValidate(true);
      });
    };

    const value = props.displayField
      ? (props.record[props.displayField] as string)
      : (props.record[props.field] as string);
    const bg = `bg-gradient-to-r from-white from-10% to-30% to-[var(--custom-color)]`; //[${props.record[props.field] as string | undefined}]`;

    return (
      <DetailFieldWrap
        {...props}
        value={value}
        render={(props, setIsEditing) => {
          return (
            <div className="flex-1">
              <div
                className={`${bg} relative flex w-full items-center rounded-lg border text-xs text-gray-400`}
                style={
                  {
                    "--custom-color": props.value,
                  } as CustomCSSProperties
                }
              >
                <input
                  type={"text"}
                  value={props.value} // Type casting to string
                  placeholder={props.placeholder}
                  className="w-full min-w-[160px] flex-1 rounded-lg border-none bg-inherit px-4 py-1.5 text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
                  readOnly={true}
                />

                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center rounded-r-md bg-gray-50 p-3 align-bottom text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </div>
              {props.helpText ? (
                <p className="mt-2 text-sm text-gray-600">{props.helpText}</p>
              ) : null}
            </div>
          );
        }}
      >
        {({ append }) => (
          <ColorInput
            value={props.record[props.field] as string}
            placeholder={props.placeholder}
            handleChange={handleChange}
            errorMessages={errorMessages}
            append={append}
          />
        )}
      </DetailFieldWrap>
    );
  }
);
