import { cn } from "@/utils/cn";
import { format, unformat, useMask } from "@react-input/mask";
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
          "text-gray-700 placeholder:text-gray-500 disabled:text-gray-300",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SSNInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value">,
    VariantProps<typeof inputStyles> {
  prepend?: ReactNode;
  append?: ReactNode;
  errorMessages?: string[];
  helpText?: ReactNode;
  value: string;
  handleChange: (ssn: string) => void;
}

// Define the component with correct generic syntax
export const SSNInput = observer((rawProps: SSNInputProps) => {
  const {
    variant,
    errorMessages,
    helpText,
    handleChange,
    prepend,
    append,
    ...props
  } = rawProps;

  const hasErrors = errorMessages && errorMessages?.length > 0;

  const maskOptions = {
    mask: "___-__-____",
    replacement: { _: /\d/ },
    showMask: true,
  };

  const inputRef = useMask(maskOptions);

  return (
    <div className={`group flex flex-col ${hasErrors ? "errors" : ""}`}>
      <div className={cn(wrapStyles({ variant }))}>
        {prepend && <InputEnd side="prepend">{prepend}</InputEnd>}

        <input
          {...props}
          ref={inputRef}
          type={"text"}
          inputMode="numeric"
          value={format(props.value ?? "", maskOptions)} // Type casting to string
          className={cn(inputStyles({ variant }))}
          onChange={(e) => {
            handleChange(unformat(e.target.value, maskOptions));
          }}
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
