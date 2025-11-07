"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(["grid gap-3", className])}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn([
        // Base Styles
        "aspect-square size-4 shrink-0 rounded-full",
        "border border-neutral-200 shadow-xs outline-none",
        // Colors
        "text-neutral-900",
        // Transitions
        "transition-[color,box-shadow]",
        // Focus States
        "focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50",
        // Invalid States
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        // Disabled State
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Dark Mode - Base
        "dark:bg-neutral-200/30 dark:border-neutral-800 dark:text-neutral-50",
        "dark:dark:bg-neutral-800/30",
        // Dark Mode - Focus
        "dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        // Dark Mode - Invalid States
        "dark:aria-invalid:ring-red-500/40 dark:aria-invalid:ring-red-900/20",
        "dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
        className,
      ])}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
