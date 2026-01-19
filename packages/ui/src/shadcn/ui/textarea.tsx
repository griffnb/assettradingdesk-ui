import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn([
        // Layout & Sizing
        "flex min-h-16 w-full",
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
        "focus-visible:border-neutral-950 focus-visible:ring-1 focus-visible:ring-primary/50",
        // Invalid States
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        // Placeholder
        "placeholder:text-neutral-500",

        className,
      ])}
      {...props}
    />
  );
}

export { Textarea };
