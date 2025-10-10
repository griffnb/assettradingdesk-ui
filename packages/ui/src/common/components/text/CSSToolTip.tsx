import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ReactElement, ReactNode } from "react";

const tooltipStyles = cva(
  "absolute px-2 py-1 opacity-0 transition-all peer-hover:opacity-100 hover:opacity-100 z-popover",
  {
    variants: {
      variant: {
        dark: "rounded-md bg-bg-neutral-overlay text-white text-xs font-semibold",
        light:
          "rounded-md bg-white text-text-neutral-primary text-xs font-semibold",
      },
      position: {
        top: [
          "bottom-full left-1/2 w-max -translate-x-1/2 -translate-y-0.5",
          "peer-hover:-translate-y-1 hover:-translate-y-1",
        ],
        bottom: [
          "top-full left-1/2 w-max -translate-x-1/2 translate-y-0.5",
          "peer-hover:translate-y-1 hover:translate-y-1",
        ],
        left: [
          "right-full top-1/2 w-max -translate-y-1/2 -translate-x-0.5",
          "peer-hover:-translate-x-1 hover:-translate-x-1",
        ],
        right: [
          "left-full top-1/2 w-max -translate-y-1/2 translate-x-0.5",
          "peer-hover:translate-x-1 hover:translate-x-1",
        ],
        "right-top": [
          "left-full top-0 w-max -translate-y-0.5 -translate-x-0.5",
          "peer-hover:-translate-x-1 hover:-translate-x-1",
        ],
        "left-top": [
          "right-full top-0 w-max -translate-y-0.5 translate-x-0.5",
          "peer-hover:-translate-x-1 hover:-translate-x-1",
        ],
      },
      delay: {
        default: "delay-300",
      },
    },
    defaultVariants: {
      variant: "dark",
      position: "top",
      delay: "default",
    },
  }
);

interface TooltipProps extends VariantProps<typeof tooltipStyles> {
  tooltip: string | ReactNode;
  children: ReactElement;
  className?: string;
}

export const CSSToolTip = observer((props: TooltipProps) => {
  return (
    <>
      <div className="relative w-fit">
        <span className="peer contents">{props.children}</span>
        <span
          className={cn(
            tooltipStyles({
              variant: props.variant,
              position: props.position,
              delay: props.delay,
            }),
            props.className
          )}
        >
          {props.tooltip}
        </span>
      </div>
    </>
  );
});
