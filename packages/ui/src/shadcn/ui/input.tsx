import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn([
        // Layout & Sizing
        "h-9 w-full min-w-0",
        // Spacing
        "px-3 py-1",
        // Colors & Borders
        "rounded-md border border-neutral-200 bg-transparent shadow-xs",
        // Typography
        "text-base md:text-sm",
        // States
        "outline-none transition-[color,box-shadow]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Focus States
        "focus-visible:border-neutral-950 focus-visible:ring-1 focus-visible:ring-primary/50",
        // Invalid States
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        // Selection
        "selection:bg-neutral-900 selection:text-neutral-50",
        // File Input
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent",
        "file:text-sm file:font-medium file:text-neutral-950",
        // Placeholder
        "placeholder:text-neutral-500",

        className,
      ])}
      {...props}
    />
  );
}

export { Input };
