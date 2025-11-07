"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn([
        // Base Styles
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center",
        "rounded-full border border-neutral-200 border-transparent shadow-xs outline-none",
        // Transitions
        "transition-all",
        // Focus States
        "focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50",
        // Disabled State
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Data States
        "data-[state=checked]:bg-indigo-600",
        "data-[state=unchecked]:bg-neutral-200",
        // Dark Mode - Base
        "dark:border-neutral-800",
        // Dark Mode - Focus
        "dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        // Dark Mode - Data States
        "dark:data-[state=checked]:bg-neutral-50",
        "dark:data-[state=unchecked]:bg-neutral-200/80 dark:data-[state=unchecked]:bg-neutral-800",
        "dark:dark:data-[state=unchecked]:bg-neutral-800/80",
        className,
      ])}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn([
          "pointer-events-none block size-4 rounded-full",
          "bg-white ring-0",
          "transition-transform",
          "data-[state=checked]:translate-x-[calc(100%-2px)]",
          "data-[state=unchecked]:translate-x-0",
          "dark:bg-neutral-950",
          "dark:data-[state=checked]:bg-neutral-50",
          "dark:data-[state=unchecked]:bg-neutral-950",
          "dark:dark:data-[state=checked]:bg-neutral-900",
          "dark:dark:data-[state=unchecked]:bg-neutral-50",
        ])}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
