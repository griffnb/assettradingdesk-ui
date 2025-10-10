import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { InputHTMLAttributes, ReactNode } from "react";
import { ErrorMarker } from "./base/ErrorMarker";
import { ErrorMessages } from "./base/ErrorMessages";
import { HelpText } from "./base/HelpText";
import { InputEnd } from "./base/InputEnd";

const wrapStyles = cva(
  `relative flex w-full items-center rounded-lg border  text-xs `,
  {
    variants: {
      variant: {
        default: "text-gray-400 group-[.errors]:border-error-600 bg-white",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const inputStyles = cva(
  `w-full flex-1 rounded-lg border-none px-4 py-1.5  !ring-0`,
  {
    variants: {
      variant: {
        default:
          "text-gray-700 placeholder:text-gray-500 disabled:text-gray-400",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  prepend?: ReactNode;
  append?: ReactNode;
  errorMessages?: string[];
  helpText?: ReactNode;
  handleChange: (value: string) => void;
}

// Define the component with correct generic syntax
export const TextInput = observer((rawProps: TextInputProps) => {
  const {
    className,
    variant,
    errorMessages,
    helpText,
    handleChange,
    onBlur,
    prepend,
    append,
    ...props
  } = rawProps;

  const hasErrors = errorMessages && errorMessages?.length > 0;

  return (
    <div
      className={cn(
        `group flex flex-col ${hasErrors ? "errors" : ""}`,
        className
      )}
    >
      <div className={cn(wrapStyles({ variant }))}>
        {prepend && <InputEnd side="prepend">{prepend}</InputEnd>}

        <input
          {...props}
          value={props.value ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={(e) => {
            if (e.target.value != e.target.value.trim()) {
              handleChange(e.target.value.trim());
            }
            if (onBlur) onBlur(e);
          }}
          className={cn(inputStyles({ variant }))}
        />

        {hasErrors ? <ErrorMarker /> : null}

        {append && <InputEnd side="append">{append}</InputEnd>}
      </div>
      {helpText ? <HelpText>{helpText}</HelpText> : null}

      {errorMessages && errorMessages?.length > 0 && (
        <ErrorMessages errorMessages={errorMessages} />
      )}
    </div>
  );
});
