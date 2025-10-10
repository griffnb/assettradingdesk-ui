import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface FAButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  fa: string;
  children?: ReactNode;
  append?: boolean;
}

export type FAButtonVariants = VariantProps<
  typeof buttonStyles
>["customization"];

const buttonStyles = cva(
  "flex-none items-center justify-center text-center gap-x-2",
  {
    variants: {
      customization: {
        default: "rounded-md border border-gray-300 bg-gray-100",
        white: "rounded-md border border-border-neutral-primary bg-white",
        dark: "rounded-md border border-border-neutral-primary bg-gray-800 text-white ",
        custom: "",
      },
      size: {
        xs: "size-6 text-xxs",
        small: "size-8 text-xs",
        medium: "size-10 text-sm",
        large: "size-12 text-lg",
        xl: "size-10 text-2xl",
        custom: "",
      },
    },
    defaultVariants: {
      customization: "default",
      size: "small",
    },
  },
);

export const FAButton = (props: FAButtonProps) => {
  const { fa, customization, size, className, ...rest } = props; // Spread the remaining props

  return (
    <button
      className={cn(buttonStyles({ customization, size }), className || "")}
      {...rest}
    >
      {props.children && props.append && props.children}
      <i
        className={cn(`flex cursor-pointer items-center justify-center`, fa)}
      />
      {props.children && !props.append && props.children}
    </button>
  );
};
