import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

import { ReactNode } from "react";

const styleVariants = cva("flex flex-row items-center justify-between", {
  variants: {
    variant: {
      light:
        "border-gray-200 bg-white text-gray-900 border-b px-8 pt-4 lg:pt-8 pb-4",
      admin:
        "px-6 py-2 border-b border-gray-900 bg-gradient-to-r from-[#4B5565] to-[#2E333D] text-white",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

const titleVariants = cva("font-semibold", {
  variants: {
    variant: {
      light: "text-2xl",
      admin: "text-xl",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

const subTitleVariants = cva("max-w-[800px]", {
  variants: {
    variant: {
      light: "text-sm text-text-neutral-tertiary",
      admin: "text-sm text-text-white",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

interface TitleBarProps extends VariantProps<typeof styleVariants> {
  title: string;
  subText?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const TitleBar = (props: TitleBarProps) => {
  return (
    <>
      <div
        className={cn(
          styleVariants({ variant: props.variant, className: props.className })
        )}
      >
        <div className="flex flex-col gap-y-1">
          <h3
            className={cn(
              titleVariants({
                variant: props.variant,
              })
            )}
          >
            {props.title}
          </h3>
          {props.subText && (
            <div
              className={cn(
                subTitleVariants({
                  variant: props.variant,
                })
              )}
            >
              {props.subText}
            </div>
          )}
        </div>
        {props.children}
      </div>
    </>
  );
};

export default TitleBar;
