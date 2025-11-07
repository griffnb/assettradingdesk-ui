import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

const badgeVariants = cva(
  [
    // Layout & Display
    "inline-flex items-center justify-center",
    "w-fit whitespace-nowrap shrink-0 overflow-hidden",
    // Spacing
    "px-2 py-0.5 gap-1",
    // Typography
    "text-xs font-medium",
    // Borders & Shape
    "rounded-md border border-neutral-200",
    // Transitions
    "transition-[color,box-shadow]",
    // Focus States
    "focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring-[3px]",
    // Invalid States
    "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
    // SVG Styles
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    // Dark Mode - Base
    "dark:border-neutral-800",
    "dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
    // Dark Mode - Invalid States
    "dark:aria-invalid:ring-red-500/40 dark:aria-invalid:ring-red-900/20",
    "dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-transparent bg-neutral-900 text-neutral-50",
          "[a&]:hover:bg-neutral-900/90",
          "dark:bg-neutral-50 dark:text-neutral-900",
          "dark:[a&]:hover:bg-neutral-50/90",
        ],
        secondary: [
          "border-transparent bg-neutral-100 text-neutral-900",
          "[a&]:hover:bg-neutral-100/90",
          "dark:bg-neutral-800 dark:text-neutral-50",
          "dark:[a&]:hover:bg-neutral-800/90",
        ],
        destructive: [
          "border-transparent bg-red-500 text-white",
          "[a&]:hover:bg-red-500/90",
          "focus-visible:ring-red-500/20",
          "dark:bg-red-500/60 dark:bg-red-900",
          "dark:[a&]:hover:bg-red-900/90",
          "dark:focus-visible:ring-red-500/40",
          "dark:dark:focus-visible:ring-red-900/40 dark:dark:bg-red-900/60",
        ],
        outline: [
          "text-neutral-950",
          "[a&]:hover:bg-neutral-100 [a&]:hover:text-neutral-900",
          "dark:text-neutral-50",
          "dark:[a&]:hover:bg-neutral-800 dark:[a&]:hover:text-neutral-50",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
