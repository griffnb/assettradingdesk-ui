import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { Children, HTMLAttributes, isValidElement, ReactNode } from "react";

const styleVariants = cva("relative inline-flex items-center", {
  variants: {
    variant: {
      default: ["px-3 py-2 text-sm", "font-semibold text-gray-900"],
    },
    side: {
      append: "-mr-px border-l",
      prepend: "-ml-px border-r",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InputEndProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  children: ReactNode;
}
export const InputEnd = (fullProps: InputEndProps) => {
  const { className, variant, side, ...props } = fullProps;

  const shouldWrapChild = (child: ReactNode): boolean => {
    if (isValidElement(child)) {
      // Check for the presence of the data-nowrap attribute
      //@ts-expect-error - ignore
      return child.props?.["data-nowrap"] !== true;
    }
    return true;
  };
  return Children.map(props.children, (child) =>
    shouldWrapChild(child) ? (
      <div
        {...props}
        className={cn(styleVariants({ variant, className, side }))}
        data-slot={`input-side-${side}`}
      >
        {child}
      </div>
    ) : (
      child
    )
  );
};
