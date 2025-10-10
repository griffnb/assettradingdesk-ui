import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const styleVariants = cva(
  "inline-flex flex-none items-center justify-center absolute  aspect-square -translate-y-1/4 translate-x-1/4 transform rounded-full",
  {
    variants: {
      color: {
        red: "bg-red-500 text-white",
        orange: "bg-orange-500 text-white",
        yellow: "bg-yellow-500 text-white",
        green: "bg-green-500 text-white",
        teal: "bg-teal-500 text-white",
        blue: "bg-blue-500 text-white",
        indigo: "bg-indigo-500 text-white",
        purple: "bg-purple-500 text-white",
        pink: "bg-pink-500 text-white",
        primary: "bg-fg-brand-primary text-white",
      },
      size: {
        sm: "text-[0.5rem] size-[0.75rem] right-0 top-0",
        md: "text-[0.75rem] size-[1.25rem] -right-1 -top-1",
        lg: "text-[1rem] size-[1.75rem]",
      },
    },
    defaultVariants: {
      color: "red",
      size: "sm",
    },
  },
);

export type CountBadgeColorKeys = VariantProps<typeof styleVariants>["color"];

interface CountBadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof styleVariants> {
  count: number;
  size: "sm" | "md" | "lg";
}

export const CountBadge = (fullProps: CountBadgeProps) => {
  const { className, color, size, count, ...props } = fullProps;

  if (count === 0) {
    return null;
  }

  return (
    <div {...props} className={cn(styleVariants({ color, size, className }))}>
      {count < 100 && count}
    </div>
  );
};
