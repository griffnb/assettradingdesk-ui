import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";

const styleVariants = cva("", {
  variants: {
    variant: {
      default: "mt-2 text-sm text-gray-600",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface HelpTextProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  children: string | ReactNode;
}
export const HelpText = (fullProps: HelpTextProps) => {
  const { className, variant, ...props } = fullProps;
  return (
    <div {...props} className={cn(styleVariants({ variant, className }))}>
      {props.children}
    </div>
  );
};
