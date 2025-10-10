import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { ChangeEvent, ReactNode } from "react";
import CheckboxBase from "./base/CheckboxBase";
import { ErrorMessages } from "./base/ErrorMessages";

interface CheckboxInputProps<T extends string | number | boolean> {
  value: T;
  label?: string;
  placeholder?: string;
  icon?: string;
  uncheckedValue: T;
  checkedValue: T;
  errorMessages?: string[];
  helpText?: ReactNode;
  handleChange: (value: T) => void;
  append?: ReactNode;
  inlineEdit?: boolean;
  className?: string;
}

// Define the component with correct generic syntax
export const CheckboxInput = observer(function CheckboxInput<
  T extends string | number | boolean,
>(props: CheckboxInputProps<T>) {
  //const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

  const toggleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    props.handleChange(
      event.target.checked ? props.checkedValue : props.uncheckedValue
    );
  };

  let wrapperClass = "";
  if (props.inlineEdit) {
    wrapperClass =
      " rounded-lg border bg-white text-xs text-gray-400 shadow-sm w-fit gap-x-5";
  }

  return (
    <div
      className={cn(
        `flex flex-row items-center gap-x-2 self-stretch rounded-md`,
        wrapperClass,
        props.className
      )}
    >
      <CheckboxBase
        value={props.value}
        checkedValue={props.checkedValue}
        handleChange={toggleCheck}
      />

      {!props.inlineEdit && (
        <div
          data-slot="checkbox-label-wrap"
          className="flex flex-row items-center gap-x-1 text-sm leading-4"
        >
          {props.icon && (
            <span className="w-4">
              <i className={`${props.icon}`}></i>
            </span>
          )}
          <label
            className="font-medium text-gray-700"
            data-slot="checkbox-label"
          >
            {props.placeholder || ""}
          </label>
          {props.helpText && <p className="text-gray-600">{props.helpText}</p>}
          {props.errorMessages && props.errorMessages?.length > 0 && (
            <ErrorMessages errorMessages={props.errorMessages} />
          )}
        </div>
      )}
      <div className="bg-white">{props.append ? props.append : null}</div>
    </div>
  );
});
