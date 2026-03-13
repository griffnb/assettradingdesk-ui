import { cn } from "@/common_lib/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

const styleVariants = cva("p-2 bg-gray-300 flex flex-col gap-4", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface StandardContentWrapProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  children: React.ReactNode;
}
export const StandardContentWrap = observer(function StandardContentWrap(
  fullProps: StandardContentWrapProps,
) {
  const { className, variant, children } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>{children}</div>
  );
});
