"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn([
        // Base Styles
        "peer size-4 shrink-0",
        "rounded-[4px] border border-neutral-200 shadow-xs outline-none",
        // Transitions
        "transition-shadow",
        // Checked State
        "data-[state=checked]:bg-neutral-900 data-[state=checked]:text-neutral-50",
        "data-[state=checked]:border-neutral-900",
        // Focus States
        "focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring-[3px]",
        // Invalid States
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        // Disabled State
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Dark Mode - Base
        "dark:bg-neutral-200/30 dark:border-neutral-800",
        "dark:dark:bg-neutral-800/30",
        // Dark Mode - Checked State
        "dark:data-[state=checked]:bg-neutral-900 dark:data-[state=checked]:text-neutral-900",
        "dark:dark:data-[state=checked]:bg-neutral-50",
        "dark:data-[state=checked]:border-neutral-50",
        // Dark Mode - Focus States
        "dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        // Dark Mode - Invalid States
        "dark:aria-invalid:ring-red-500/40 dark:aria-invalid:ring-red-900/20",
        "dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
        className,
      ])}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
