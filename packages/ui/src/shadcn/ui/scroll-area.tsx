"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function ScrollArea({
  className,
  children,
  viewportOnScroll,
  viewportRef,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportRef?: React.RefObject<HTMLDivElement | null>;
  viewportOnScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn(["relative", className])}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        ref={viewportRef}
        onScroll={viewportOnScroll}
        className={cn([
          /* Layout & Display */
          "size-full rounded-[inherit] outline-none",
          /* Transitions */
          "transition-[color,box-shadow]",
          /* Focus Styles */
          "focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50",
          /* Dark Mode */
          "dark:focus-visible:ring-neutral-300/50",
        ])}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn([
        /* Layout & Interaction */
        "flex touch-none select-none p-px",
        /* Transitions */
        "transition-colors",
        /* Vertical Orientation */
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        /* Horizontal Orientation */
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      ])}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn([
          /* Layout & Display */
          "relative flex-1 rounded-full",
          /* Colors */
          "bg-neutral-200",
          /* Dark Mode */
          "dark:bg-neutral-800",
        ])}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
