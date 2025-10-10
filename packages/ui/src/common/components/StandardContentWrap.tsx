import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const styleVariants = cva("flex flex-col overflow-y-auto", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const innerVariants = cva("flex flex-col self-stretch px-4 py-6 lg:px-8", {
  variants: {
    size: {
      default: "lg:max-w-[800px]",
      lg: "lg:max-w-[1000px]",
      full: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface StandardContentWrapProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants>,
    VariantProps<typeof innerVariants> {}
/**
 * A standard content wrap component that provides a consistent layout for content.
 *
 * @example
 * [&_*[data-slot='inner-wrap']]:mx-auto Nested Child
 * [&>[data-slot='inner-wrap']]:mx-auto Direct Child
 *
 * @slot {"inner-wrap"} data-slot="inner-wrap"
 */
export const StandardContentWrap = (fullProps: StandardContentWrapProps) => {
  const { className, variant, size, ...props } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <div data-slot="inner-wrap" className={cn(innerVariants({ size }))}>
        {props.children}
      </div>
    </div>
  );
};
