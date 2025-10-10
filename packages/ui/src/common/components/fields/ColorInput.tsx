import { HexColorInput, HexColorPicker } from "react-colorful";

import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { ErrorMarker } from "./base/ErrorMarker";
import { ErrorMessages } from "./base/ErrorMessages";
import { HelpText } from "./base/HelpText";
import { InputEnd } from "./base/InputEnd";

interface CustomCSSProperties extends CSSProperties {
  "--custom-color"?: string;
}

export interface ColorInputProps {
  value: string;
  placeholder?: string;
  append?: ReactNode;
  prepend?: ReactNode;
  errorMessages?: string[];

  helpText?: ReactNode;
  handleChange: (color: string) => void;
  readOnly?: boolean;

  required?: boolean;
  onBlur?: () => void;
  position?: "top" | "bottom";
}

// Define the component with correct generic syntax
export const ColorInput = observer((props: ColorInputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to call on click event
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside); // Step 2
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside); // Step 4
    };
  }, []); // Empty dependency array ensures that effect runs only once

  const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

  const bg = `bg-gradient-to-r from-white from-10% to-30% to-[var(--custom-color)]`; //[${props.record[props.field] as string | undefined}]`;

  let postitionCSS = "";
  if (props.position === "top") {
    postitionCSS = "bottom-10";
  }
  if (props.position === "bottom") {
    postitionCSS = "top-10";
  }

  return (
    <div className={`group flex-1 ${hasErrors ? "errors" : ""}`}>
      <div
        className={`relative flex w-full items-center rounded-lg border ${bg} text-xs text-gray-400 shadow-sm group-[.errors]:border-error-600`}
        style={
          {
            "--custom-color": props.value,
          } as CustomCSSProperties
        }
      >
        {show && (
          <div
            ref={pickerRef}
            className={cn(`absolute left-0 z-popover`, postitionCSS)}
          >
            <HexColorPicker color={props.value} onChange={props.handleChange} />
          </div>
        )}
        <span
          className="relative inline-flex cursor-pointer flex-col items-center justify-center gap-x-1.5 rounded-l-lg border-r border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          onClick={() => setShow(!show)}
        >
          <i className="fa fa-droplet flex h-5 cursor-pointer items-center justify-center"></i>
        </span>

        {props.prepend && <InputEnd side="prepend">{props.prepend}</InputEnd>}
        <HexColorInput
          color={props.value}
          className={`w-full flex-1 rounded-lg border-none bg-inherit px-4 py-1.5 text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300`}
          onChange={props.handleChange}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          required={props.required}
          onBlur={props.onBlur}
          prefixed={true}
        />

        {hasErrors && <ErrorMarker />}

        {props.append && <InputEnd side="append">{props.append}</InputEnd>}
      </div>

      {props.helpText && <HelpText>{props.helpText}</HelpText>}

      <ErrorMessages errorMessages={props.errorMessages} />
    </div>
  );
});
