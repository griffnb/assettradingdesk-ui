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
        "border border-neutral-200 bg-transparent rounded-md shadow-xs",
        // Typography
        "text-base md:text-sm",
        // States
        "outline-none transition-[color,box-shadow]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Focus States
        "focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50",
        // Invalid States
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        // Selection
        "selection:bg-neutral-900 selection:text-neutral-50",
        // File Input
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent",
        "file:text-sm file:font-medium file:text-neutral-950",
        // Placeholder
        "placeholder:text-neutral-500",
        // Dark Mode - Base
        "dark:border-neutral-800 dark:bg-neutral-200/30",
        "dark:dark:bg-neutral-800/30",
        // Dark Mode - States
        "dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        "dark:aria-invalid:ring-red-500/40 dark:aria-invalid:ring-red-900/20",
        "dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
        // Dark Mode - Selection & File
        "dark:selection:bg-neutral-50 dark:selection:text-neutral-900",
        "dark:file:text-neutral-50",
        "dark:placeholder:text-neutral-400",
        className,
      ])}
      {...props}
    />
  );
}

export { Input };
