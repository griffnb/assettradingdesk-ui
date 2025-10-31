import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { HelpText } from "../../fields/base/HelpText";
import { InputEnd } from "../../fields/base/InputEnd";

interface DetailInputProps {
  value: string;
  placeholder?: string;
  helpText?: ReactNode;
  prepend?: ReactNode;
  append?: ReactNode;
  textArea?: boolean;
  link?: string;
  newWindow?: boolean;
  rows?: number;
  linkLabel?: string;
}

// Define the component with correct generic syntax
export const DetailInput = observer(function DetailInput(
  props: DetailInputProps,
) {
  return (
    <div className="flex-1">
      <div
        className={`flex w-full min-w-[210px] rounded-lg border bg-white text-xs text-gray-400`}
      >
        {props.prepend && <InputEnd side="prepend">{props.prepend}</InputEnd>}

        {props.textArea ? (
          <textarea
            value={props.value ?? ""} // Type casting to string
            placeholder={props.placeholder}
            className="w-full min-w-[160px] flex-1 rounded-lg border-none px-4 py-1.5 text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
            readOnly={true}
            rows={props.rows || 4}
          />
        ) : props.link && props.value ? (
          <a
            href={props.link}
            rel={props.newWindow ? "noopener noreferrer" : undefined}
            target={props.newWindow ? "_blank" : "_self"}
            className="flex w-full flex-1 flex-col justify-center rounded-lg border-none px-4 py-1.5 text-[1.3em] text-blue-700 underline placeholder:text-gray-500 disabled:text-gray-300"
          >
            {props.value}
          </a>
        ) : (
          <input
            type={"text"}
            value={props.value ?? ""} // Type casting to string
            placeholder={props.placeholder}
            className="w-full min-w-[160px] flex-1 rounded-lg border-none px-4 py-1.5 text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
            readOnly={true}
          />
        )}

        {props.append && <InputEnd side="append">{props.append}</InputEnd>}
      </div>
      {props.helpText && <HelpText>{props.helpText}</HelpText>}
    </div>
  );
});
