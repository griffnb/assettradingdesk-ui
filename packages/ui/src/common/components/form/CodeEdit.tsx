import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import Prism, { Grammar } from "prismjs";
import "prismjs/themes/prism.min.css"; //Example style, you can use another
import { ReactNode } from "react";
import Editor from "react-simple-code-editor";
import { ErrorMessages } from "../fields/base/ErrorMessages";
import { HelpText } from "../fields/base/HelpText";
import { InputEnd } from "../fields/base/InputEnd";

const variantStyles = cva("group flex w-full flex-col", {
  variants: {
    variant: {
      default: ["rounded-md border border-gray-200 bg-white"],
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const wrapStyles = cva("block overflow-auto size-full", {
  variants: {
    variant: {
      default: ["max-h-96"],
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const editorStyles = cva("", {
  variants: {
    variant: {
      default: [""],
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CodeEditProps extends VariantProps<typeof variantStyles> {
  value: string;
  onChange: (value: string) => void;
  language: "html" | "css" | "javascript";
  editorClassName?: string;
  wrapperClassName?: string;
  readOnly?: boolean;
  errorMessages?: string[];
  helpText?: ReactNode;
  prepend?: ReactNode;
  append?: ReactNode;
}
const CodeEdit = observer((rawProps: CodeEditProps) => {
  const {
    prepend,
    append,
    errorMessages,
    helpText,
    onChange,
    wrapperClassName,
    editorClassName,
    ...props
  } = rawProps;
  const hasErrors = rawProps.errorMessages && rawProps.errorMessages.length > 0;

  return (
    <div
      className={cn(
        variantStyles({
          variant: props.variant,
          className: `${hasErrors ? "errors" : ""}`,
        })
      )}
    >
      <div className="flex w-full flex-row">
        {prepend && <InputEnd side="prepend">{prepend}</InputEnd>}
        <div
          className={cn(
            wrapStyles({ variant: props.variant, className: wrapperClassName })
          )}
        >
          <Editor
            {...props}
            onValueChange={(code) => onChange(code)}
            highlight={(code) =>
              Prism.highlight(
                code,
                Prism.languages[props.language] as Grammar,
                props.language
              )
            }
            padding={10}
            textareaClassName=""
            preClassName=""
            className={cn(
              editorStyles({
                variant: props.variant,
                className: editorClassName,
              })
            )}
          />
        </div>
        {append && <InputEnd side="append">{append}</InputEnd>}
      </div>
      {helpText ? <HelpText>{helpText}</HelpText> : null}
      {errorMessages && errorMessages?.length > 0 && (
        <ErrorMessages errorMessages={errorMessages} />
      )}
    </div>
  );
});

export default CodeEdit;
