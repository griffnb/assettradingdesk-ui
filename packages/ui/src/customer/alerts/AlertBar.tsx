import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

/**
 * ## AlertBar Slots
 * @example
 * Any Child [&_*[data-slot='alert-bar-icon']]:text-red-500
 *
 * @slot {"alert-bar"} data-slot="alert-bar"
 * @slot {"alert-bar-content"} data-slot="alert-bar-content"
 * @slot {"alert-bar-icon"} data-slot="alert-bar-icon"
 * @slot {"alert-bar-text-container"} data-slot="alert-bar-text-container"
 * @slot {"alert-bar-title"} data-slot="alert-bar-title"
 * @slot {"alert-bar-description"} data-slot="alert-bar-description"
 * @slot {"alert-bar-actions"} data-slot="alert-bar-actions"
 */

const styleVariants = cva(
  "flex items-center justify-start gap-4 px-5 py-4 border",
  {
    variants: {
      color: {
        "dark-blue":
          "bg-gradient-to-br from-utility-brand-700 to-utility-brand-500 text-text-neutral-primary-on-brand",
        brand:
          "bg-gradient-to-r from-bg-brand-primary to-60% to-bg-neutral-primary text-text-neutral-secondary",
        error:
          "bg-gradient-to-r from-bg-error-primary to-60% to-bg-neutral-primary text-text-neutral-secondary",
        warning:
          "bg-gradient-to-r from-bg-warning-primary to-60% to-bg-neutral-primary text-text-neutral-secondary",
        success:
          "bg-gradient-to-r border-2 border-border-success-secondary from-bg-success-primary to-90% to-bg-neutral-primary text-text-neutral-secondary",
      },
      style: {
        rounded: "rounded-xl",
        square: "rounded-none",
      },
      layout: {
        row: "flex-row",
        col: "flex-col",
      },
    },
    defaultVariants: {
      color: "brand",
      style: "rounded",
      layout: "row",
    },
  },
);

interface AlertBarProps extends VariantProps<typeof styleVariants> {
  title: ReactNode;
  description: ReactNode;
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
}
export const AlertBar = observer((rawProps: AlertBarProps) => {
  const { className, style, color, layout, ...props } = rawProps;
  return (
    <div
      data-slot="alert-bar"
      className={cn(styleVariants({ style, color, layout, className }))}
    >
      <div
        data-slot="alert-bar-content"
        className="flex flex-row items-center justify-start gap-2 self-stretch"
      >
        {props.icon && (
          <div data-slot="alert-bar-icon" className="flex-none self-start">
            {props.icon}
          </div>
        )}

        <div
          data-slot="alert-bar-text-container"
          className="flex flex-1 flex-col items-start justify-start"
        >
          <div
            data-slot="alert-bar-title"
            className="text-left text-xl font-bold"
          >
            {props.title}
          </div>
          <div
            data-slot="alert-bar-description"
            className="flex flex-row text-left"
          >
            {props.description}
          </div>
        </div>
      </div>

      {props.children && (
        <div
          data-slot="alert-bar-actions"
          className="flex flex-row items-center gap-2"
        >
          {props.children}
        </div>
      )}
    </div>
  );
});
