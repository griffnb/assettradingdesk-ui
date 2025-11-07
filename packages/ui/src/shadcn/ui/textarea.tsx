import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn([
        // Layout & Sizing
        "field-sizing-content flex min-h-16 w-full",
        // Spacing
        "px-3 py-2",
        // Colors & Borders
        "rounded-md border border-neutral-200 bg-transparent shadow-xs",
        // Typography
        "text-base md:text-sm",
        // States
        "outline-none transition-[color,box-shadow]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Focus States
        "focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50",
        // Invalid States
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        // Placeholder
        "placeholder:text-neutral-500",
        // Dark Mode - Base
        "dark:bg-neutral-200/30 dark:border-neutral-800",
        "dark:dark:bg-neutral-800/30",
        // Dark Mode - States
        "dark:placeholder:text-neutral-400",
        "dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        "dark:aria-invalid:ring-red-500/40 dark:aria-invalid:ring-red-900/20",
        "dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
        className,
      ])}
      {...props}
    />
  );
}

export { Textarea };
