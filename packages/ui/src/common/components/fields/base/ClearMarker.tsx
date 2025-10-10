import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, MouseEvent } from "react";

const styleVariants = cva("flex cursor-pointer items-center justify-center", {
  variants: {
    variant: {
      default: "mr-2  size-4 rounded-xl bg-gray-500 text-[10px] text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ClearMarkerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  clearSelection: (e: MouseEvent) => void;
}
export const ClearMarker = (fullProps: ClearMarkerProps) => {
  const { className, variant, ...props } = fullProps;
  return (
    <div
      className={cn(styleVariants({ variant, className }))}
      onClick={props.clearSelection}
    >
      <i className="fas fa-xmark"></i>
    </div>
  );
};
