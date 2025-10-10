import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";

import { type HTMLAttributes } from "react";

const styleVariants = {
  filled: cva("flex flex-row self-stretch size-full transition-all ease-out ", {
    variants: {
      variant: {
        default: "rounded-full bg-fg-brand-primary ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }),
  unfilled: cva("flex flex-row size-full ", {
    variants: {
      variant: {
        default: "rounded-full bg-bg-neutral-quinary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }),
};

interface ProgressBarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants.filled>,
    VariantProps<typeof styleVariants.unfilled> {
  percent: number;
}
export const ProgressBar = observer((fullProps: ProgressBarProps) => {
  const { className, variant, ...props } = fullProps;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center self-stretch",
        className
      )}
    >
      <div className={cn(styleVariants.unfilled({ variant }))}>
        <div
          className={cn(styleVariants.filled({ variant }))}
          style={{ width: `${props.percent}%` }}
        ></div>
      </div>
    </div>
  );
});
