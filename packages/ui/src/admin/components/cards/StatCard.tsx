import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

const styleVariants = cva(
  "inline-flex w-full flex-col items-start justify-center rounded-xl border border-border-neutral-primary bg-white p-2 shadow-sm min-w-fit",
  {
    variants: {
      variant: {
        default: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const textVariant = cva("font-semibold text-sm", {
  variants: {
    text_color: {
      default: "text-text-neutral-secondary",
      gray: "text-text-neutral-quaternary",
      green: "text-text-success-primary",
      red: "text-text-error-primary",
      orange: "text-text-warning-primary",
      blue: "text-text-brand-primary",
    },
  },
  defaultVariants: {
    text_color: "default",
  },
});

const iconVariant = cva("font-semibold", {
  variants: {
    text_color: {
      default: "",
      gray: "text-icon-neutral-quinary bg-bg-neutral-quaternary",
      green: "text-icon-success-primary bg-bg-success-secondary",
      red: "text-icon-error-primary bg-bg-error-secondary",
      orange: "text-icon-warning-secondary bg-bg-warning-secondary",
      blue: "text-icon-brand-primary bg-bg-brand-primary",
    },
  },
  defaultVariants: {
    text_color: "default",
  },
});

interface StatCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants>,
    VariantProps<typeof textVariant> {
  stat: number;
  subText: string;
  icon?: string;
  onClick?: () => void;
}

export const StatCard = observer((fullProps: StatCardProps) => {
  const { className, variant, subText, stat, icon, text_color, ...props } =
    fullProps;
  return (
    <div
      {...props}
      className={cn(
        styleVariants({ variant, className }),
        props.onClick && "cursor-pointer",
      )}
    >
      <div className="flex flex-row items-center justify-start">
        {icon && (
          <div
            className={`mr-3 flex flex-col items-center justify-center rounded-full p-3.5 text-xs ${cn(iconVariant({ text_color }))}`}
          >
            <i
              className={`${icon} flex size-3 items-center justify-center text-xl md:size-7`}
            />
          </div>
        )}
        <div className="flex flex-col items-start justify-center lg:text-nowrap">
          <div className="text-lg font-semibold text-text-neutral-primary">
            {stat}
          </div>
          <div className={cn(textVariant({ text_color }))}>{subText}</div>
        </div>
      </div>
    </div>
  );
});
