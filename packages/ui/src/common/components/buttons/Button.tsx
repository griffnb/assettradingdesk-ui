import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import {
  ButtonHTMLAttributes,
  forwardRef,
  HTMLAttributeAnchorTarget,
  ReactNode,
} from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  prependIcon?: ReactNode;
  as?: "button" | "a";
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  appendIcon?: ReactNode;
  children?: ReactNode;
}

const buttonStyles = cva(
  "flex flex-row items-center justify-center gap-x-2 text-nowrap shadow-sm disabled:shadow-none font-semibold",
  {
    variants: {
      variant: {
        primary: [
          "bg-fg-brand-primary text-text-neutral-white",
          "border border-transparent",
          "hover:bg-fg-brand-secondary",
          "disabled:border disabled:border-border-neutral-disabled_subtle disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled",
        ],

        secondary: [
          "bg-fg-brand-quaternary text-text-brand-primary",
          "border border-transparent",
          "hover:bg-fg-brand-quinary",
          "disabled:border disabled:bg-white disabled:border-border-neutral-disabled_subtle disabled:text-text-neutral-quinary-disabled",
        ],
        tertiary: [
          "border border-border-neutral-primary bg-white text-text-neutral-secondary",
          "hover:bg-fg-neutral-septenary",
          "disabled:border disabled:border-border-neutral-disabled_subtle  disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled ",
        ],
        tertiary_blue: [
          "border border-border-brand-tertiary bg-white text-text-brand-primary",
          "hover:bg-fg-brand-quaternary",
          "disabled:border disabled:border-border-neutral-disabled_subtle  disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled ",
        ],
        primary_destruct: [
          "bg-fg-error-primary  text-text-neutral-white",
          "border border-transparent",
          "hover:bg-error-700",
          "disabled:border disabled:border-border-neutral-disabled_subtle disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled",
        ],

        secondary_destruct: [
          "text-text-error-primary border border-border-error-secondary bg-white",
          "hover:bg-bg-error-primary",
          "disabled:border disabled:border-border-neutral-disabled_subtle disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled",
        ],
        tertiary_destruct: [
          "border border-border-error-secondary bg-white text-text-neutral-secondary",
          "hover:bg-bg-error-primary",
          "disabled:border disabled:border-border-neutral-disabled_subtle  disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled ",
        ],
        custom: "",
      },
      size: {
        xs: "px-2 py-1 text-xs font-semibold rounded-md",
        sm: "px-3 py-2 text-sm font-semibold rounded-lg",
        md: "px-3.5 py-2.5  text-sm font-semibold rounded-lg",
        lg: "px-4 py-2.5  text-base font-semibold rounded-lg",
        xl: "px-[18px] py-3 text-base font-semibold rounded-lg",
        "2xl": "h-[60px] px-22px text-lg font-semibold rounded-xl",
        icon_sm: "text-sm font-semibold size-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonStyles>["variant"];

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((rawProps: ButtonProps, ref) => {
  const {
    as = "button",
    href,
    target,
    variant,
    size,
    className,
    appendIcon,
    prependIcon,
    type,
    ...props
  } = rawProps; // Spread the remaining props

  const classes = cn(buttonStyles({ variant, size }), className || "");

  if (as === "a" && href) {
    return (
      <a href={href} className={classes} target={target} ref={ref as any}>
        {prependIcon}
        {props.children}
        {appendIcon}
      </a>
    );
  }

  return (
    <button
      className={classes}
      ref={ref as any}
      {...props}
      type={type || "button"}
    >
      {prependIcon}
      {props.children}
      {appendIcon}
    </button>
  );
});

Button.displayName = "Button";
