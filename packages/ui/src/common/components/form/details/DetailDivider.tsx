import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";

const styleVariants = cva("", {
  variants: {
    variant: {
      default:
        "mb-3 border-y border-gray-300 pr-10 pl-4 py-3 font-semibold text-text-neutral-secondary bg-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface DetailDividerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  title?: string;
  children?: ReactNode;
}
export const DetailDivider = (fullProps: DetailDividerProps) => {
  const { className, variant, ...props } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <span className="border-l border-border-neutral-primary pl-2 font-semibold">
        {props.title}
      </span>
      {props.children}
    </div>
  );
};
