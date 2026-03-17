import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

const toggleVariants = cva(
  [
    // Layout & Display
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap",
    // Shape & Typography
    "rounded-md text-sm font-medium outline-none",
    // Transitions
    "transition-[color,box-shadow]",
    // States
    "disabled:pointer-events-none disabled:opacity-50",
    // Hover States
    "hover:bg-neutral-100 hover:text-neutral-500",
    // Data States
    "data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900",
    // Focus States
    "focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring",
    // Invalid States
    "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
    // SVG Styles
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: [
          "border border-neutral-200 bg-transparent shadow-xs",
          "hover:bg-neutral-100 hover:text-neutral-900",
          "dark:border-neutral-800",
          "dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        ],
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
