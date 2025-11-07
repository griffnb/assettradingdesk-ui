import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn([
        "border-b",
        "last:border-b-0",
        className,
      ])}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn([
          // Layout & Display
          "flex flex-1 items-start justify-between gap-4",
          // Spacing & Sizing
          "py-4",
          // Typography
          "text-left text-sm font-medium",
          // Borders & Effects
          "rounded-md outline-none",
          // Transitions
          "transition-all",
          // States
          "hover:underline",
          "focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring-[3px]",
          "disabled:pointer-events-none disabled:opacity-50",
          // Data States
          "[&[data-state=open]>svg]:rotate-180",
          // Dark Mode
          "dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
          className,
        ])}
        {...props}
      >
        {children}
        <ChevronDownIcon className={cn([
          "pointer-events-none size-4 shrink-0",
          "translate-y-0.5",
          "text-neutral-500",
          "transition-transform duration-200",
          "dark:text-neutral-400",
        ])} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn([
        "overflow-hidden",
        "text-sm",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ])}
      {...props}
    >
      <div className={cn(["pt-0 pb-4", className])}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
