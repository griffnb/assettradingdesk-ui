import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

const wrapStyles = cva("w-full", {
  variants: {
    variant: {
      default: "",
      custom: "",
      inline: "grid grid-cols-[10%,1fr] items-center break-words gap-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const labelStyles = cva("", {
  variants: {
    labelStyle: {
      default: "flex flex-row  text-sm font-semibold leading-6 text-gray-700",
      custom: "",
    },
  },
  defaultVariants: {
    labelStyle: "default",
  },
});

const requiredStyles = cva("", {
  variants: {
    requiredStyle: {
      red: "ml-1 font-semibold text-error-700",
      blue: "ml-1 font-semibold text-text-brand-tertiary",
      custom: "",
    },
  },
  defaultVariants: {
    requiredStyle: "blue",
  },
});

const inputWrapStyles = cva("", {
  variants: {
    inputWrapStyle: {
      default: "mt-1.5",
      custom: "",
    },
    wrapSize: {
      default: "",
      full: "h-full",
    },
  },
  defaultVariants: {
    inputWrapStyle: "default",
    wrapSize: "default",
  },
});

interface FieldWrapProps
  extends VariantProps<typeof wrapStyles>,
    VariantProps<typeof labelStyles>,
    VariantProps<typeof requiredStyles>,
    VariantProps<typeof inputWrapStyles> {
  required?: boolean;
  field?: string;
  label: string;
  labelButton?: ReactNode;
  labelClassName?: string;
  children: ReactNode;
  className?: string;
  linkLabel?: string;
  linkHandler?: () => void;
}

/**
 *
 * @example
 * [&_*[data-slot='field-wrap-label']]:border-t
 *
 * ## FormFieldWrap
 * @slot {"field-wrap"} data-slot="field-wrap" data-[slot=field-wrap]: [data-slot="field-wrap"]:
 * @slot {"field-wrap-label"} data-slot="field-wrap-label" data-[slot=field-wrap-label]: [data-slot="field-wrap-label"]:
 * @slot {"field-wrap-input"} data-slot="field-wrap-input" data-[slot=field-wrap-input]: [data-slot="field-wrap-input"]:
 */

export type WrapVariantKeys = VariantProps<typeof wrapStyles>["variant"];
// Define the component with correct generic syntax
export const FormFieldWrap = observer(function FormFieldWrap(
  rawProps: FieldWrapProps,
) {
  const {
    variant,
    className,
    requiredStyle,
    labelStyle,
    inputWrapStyle,
    labelClassName,
    ...props
  } = rawProps;
  return (
    <div
      className={cn(wrapStyles({ variant: variant }), className)}
      data-slot="field-wrap"
    >
      <label
        htmlFor={props.field}
        className={cn(labelStyles({ labelStyle: labelStyle }), labelClassName)}
        data-slot="field-wrap-label"
      >
        {props.label}
        {props.required ? (
          <span className={cn(requiredStyles({ requiredStyle }))}>*</span>
        ) : null}
        {props.labelButton}

        {props.linkHandler && props.linkLabel && (
          <a
            className="ml-auto cursor-pointer bg-transparent text-text-brand-primary hover:underline"
            onClick={() => props.linkHandler?.()}
          >
            {props.linkLabel} <i className="fa fa-arrow-right-to-bracket" />
          </a>
        )}
      </label>

      <div
        className={cn(
          inputWrapStyles({ inputWrapStyle, wrapSize: props.wrapSize }),
        )}
        data-slot="field-wrap-input"
      >
        {props.children}
      </div>
    </div>
  );
});
