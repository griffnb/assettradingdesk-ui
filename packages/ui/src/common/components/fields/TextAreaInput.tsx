import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import {
  CSSProperties,
  KeyboardEvent,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { ErrorMessages } from "./base/ErrorMessages";
import { HelpText } from "./base/HelpText";
import { InputEnd } from "./base/InputEnd";

const wrapStyles = cva("", {
  variants: {
    variant: {
      default: [
        "rounded-md border border-gray-200 bg-white h-full",
        "group-[.errors]:border-error-600",
      ],
      custom: "",
    },
    size: {
      default: "h-32",
      full: "h-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const inputStyles = cva("flex flex-row w-full border-0  p-2 !ring-0 ", {
  variants: {
    variant: {
      default:
        "text-gray-700 placeholder:text-gray-500 focus:border-blue-600 rounded-md",
      custom: "",
    },
    size: {
      default: "",
      full: "h-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputStyles> {
  errorMessages?: string[];
  helpText?: ReactNode;
  handleChange: (value: string) => void;
  prepend?: ReactNode;
  append?: ReactNode;
  noExpand?: boolean;
  initialHeight?: string;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

/**
 *
 * ## TextAreaInput slots
 * @slot {"text-area-wrap"} data-slot="text-area-wrap"
 * @slot {"text-area-inner-wrap"} data-slot="text-area-inner-wrap"
 * @slot {"text-area-field-wrap"} data-slot="text-area-field-wrap"
 * @slot {"text-area-field"} data-slot="text-area-field"
 *
 **/
const TextAreaInput = observer((rawProps: TextAreaInputProps) => {
  const hasErrors = rawProps.errorMessages && rawProps.errorMessages.length > 0;

  const {
    errorMessages,
    helpText,
    handleChange,
    onBlur,
    prepend,
    append,
    noExpand,
    ...props
  } = rawProps;

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      // Prevent default form submit behavior
      event.stopPropagation();
    }
  };

  const expandStyle: CSSProperties = noExpand ? { resize: "none" } : {};

  return (
    <div
      className={`${hasErrors ? "errors" : ""} group flex size-full flex-col`}
      data-slot="text-area-wrap"
    >
      <div
        className={cn(wrapStyles({ variant: props.variant }))}
        data-slot="text-area-inner-wrap"
      >
        <div
          className="flex size-full flex-row"
          data-slot="text-area-field-wrap"
        >
          {prepend && <InputEnd side="prepend">{prepend}</InputEnd>}
          <textarea
            {...props}
            ref={props.inputRef}
            onBlur={(e) => {
              if (e.target.value != e.target.value.trim()) {
                handleChange(e.target.value.trim());
              }
              if (onBlur) onBlur(e);
            }}
            value={props.value ?? ""}
            onChange={(e) => handleChange(e.target.value)}
            className={cn(
              inputStyles({ variant: props.variant, size: props.size })
            )}
            onKeyDown={handleKeyDown}
            style={expandStyle}
            data-slot="text-area-field"
          />
          {append && <InputEnd side="append">{append}</InputEnd>}
        </div>
      </div>
      {helpText ? <HelpText>{helpText}</HelpText> : null}
      {errorMessages && errorMessages?.length > 0 && (
        <ErrorMessages errorMessages={errorMessages} />
      )}
    </div>
  );
});

export default TextAreaInput;
