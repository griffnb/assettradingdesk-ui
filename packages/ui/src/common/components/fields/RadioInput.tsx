import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { ErrorMessages } from "./base/ErrorMessages";
import RadioBase from "./base/RadioBase";

interface RadioInputProps {
  value: string | number;
  checkedValue: string | number;
  label: string;
  name: string;
  icon?: string;
  errorMessages?: string[];
  helpText?: ReactNode;
  handleChange: (value: string | number) => void;
}

// Define the component with correct generic syntax
const RadioInput = observer((props: RadioInputProps) => {
  //const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

  const toggleCheck = () => {
    props.handleChange(props.value);
  };
  return (
    <div
      className="flex cursor-pointer items-center gap-x-2 rounded-md pl-2 hover:bg-gray-50"
      onClick={toggleCheck}
    >
      <RadioBase
        value={props.value}
        checkedValue={props.checkedValue}
        name={props.name}
        handleChange={toggleCheck}
      />
      <div className="text-sm leading-4">
        {props.icon && <i className={`${props.icon} mr-1`}></i>}
        <label className="font-medium text-gray-700">{props.label}</label>
        {props.helpText && <p className="text-gray-600">{props.helpText}</p>}
        {props.errorMessages && props.errorMessages?.length > 0 ? (
          <ErrorMessages errorMessages={props.errorMessages} />
        ) : null}
      </div>
    </div>
  );
});

export default RadioInput;
