import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

const styleVariants = cva(
  "flex h-20 items-center justify-start gap-2 self-stretch overflow-hidden rounded-lg border-2 border-border-neutral-primary bg-fg-neutral-white px-4 py-3 shadow-sm cursor-pointer",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface AuthSelectButtonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  icon: string;
  label: string;
  subLabel?: string;
}
export const AuthSelectButton = observer(function AuthSelectButton(
  fullProps: AuthSelectButtonProps,
) {
  const { className, label, icon, subLabel, variant, onClick } = fullProps;
  return (
    <div
      className={cn(styleVariants({ variant, className }))}
      onClick={onClick}
    >
      <i className={cn("!size-10 flex-none text-text-brand-primary", icon)}></i>
      <div className="flex flex-1 flex-col items-start justify-center px-px">
        <div className="justify-start text-lg font-semibold leading-6 text-text-neutral-secondary">
          {label}
        </div>
        {subLabel && (
          <div className="justify-start text-sm font-normal leading-4 text-text-neutral-tertiary">
            {subLabel}
          </div>
        )}
      </div>

      <i className="u u-chevron-right size-5 flex-none text-icon-brand-primary" />
    </div>
  );
});
