import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";

const colorVariants = {
  gray: "text-gray-modern-900 bg-gray-modern-50 border-gray-modern-200",
  brand: "bg-brand-50 border-brand-200 text-brand-600",
  error: "bg-error-50 text-error-600 border-error-200",
  warning: "bg-warning-50 text-warning-700 border-warning-200",
  success: "bg-success-50 text-success-700 border-success-200",
  "gray-blue": "bg-gray-blue-50 text-gray-blue-700 border-gray-blue-200",
  "blue-light":
    "bg-utility-blue-light-50 text-utility-blue-light-700 border-utility-blue-light-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
  indigo: "bg-utility-indigo-50 text-indigo-700 border-indigo-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
  orange: "bg-orange-dark-50 text-orange-dark-700 border-orange-dark-200",
  red: "bg-fg-error-primary border-fg-error-primary text-white",
};

const styleVariants = cva(
  "justify-start items-center inline-flex flex-row gap-x-1 text-nowrap ",
  {
    variants: {
      variant: {
        pillColor: "border rounded-full",
        pillOutline: "!bg-white border-2 rounded-full",
        badgeColor: "rounded-md border",
        badgeOutline: "!bg-white border rounded-md",
      },
      color: colorVariants,
      size: {
        sm: "text-xs h-5 px-2 py-px",
        sm_round: "text-xs size-6 items-center justify-center flex-none",
        md: "text-sm h-[22px] px-2.5 py-px",
        md_round: "text-sm size-7 items-center justify-center flex-none",
        lg: "text-sm h-7 px-3 py-1",
        lg_round: "text-base size-12 items-center justify-center flex-none",
      },
    },
    defaultVariants: {
      variant: "pillColor",
      color: "gray",
      size: "sm",
    },
  },
);

export type BadgeColorKeys = VariantProps<typeof styleVariants>["color"];
export const BadgeColors = [
  "brand",
  "error",
  "warning",
  "success",
  "gray-blue",
  "blue-light",
  "teal",
  "indigo",
  "purple",
  "pink",
  "orange",
];

export const textColorFromBadge = (color: BadgeColorKeys) => {
  // @ts-expect-error this is ok
  return colorVariants[color];
};

interface BadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof styleVariants> {
  prependIcon?: ReactNode;
  appendIcon?: ReactNode;
  children?: ReactNode;
}

/**
 * ## Badge slots
 * @example [&_*[data-slot='thead-tr']]:border-t
 * @slot {"badge"} data-slot="badge"
 * @slot {"badge-prepend-icon"} data-slot="badge-prepend-icon"
 * @slot {"badge-content"} data-slot="badge-content"
 * @slot {"badge-append-icon"} data-slot="badge-append-icon"
 */

export const Badge = (fullProps: BadgeProps) => {
  const { className, color, appendIcon, prependIcon, variant, size, ...props } =
    fullProps;
  return (
    <div
      {...props}
      data-slot="badge"
      className={cn(styleVariants({ variant, size, color, className }))}
    >
      {prependIcon && (
        <div
          data-slot="badge-prepend-icon"
          className="flex flex-col items-center justify-center"
        >
          {prependIcon}
        </div>
      )}
      {props.children}
      {appendIcon && (
        <div
          data-slot="badge-append-icon"
          className="flex flex-col items-center justify-center"
        >
          {appendIcon}
        </div>
      )}
    </div>
  );
};
