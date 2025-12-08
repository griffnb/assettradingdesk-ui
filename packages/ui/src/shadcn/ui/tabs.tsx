"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";
import { type VariantProps, cva } from "class-variance-authority";

const tabsVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "gap-2",
      underline: "gap-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tabsListVariants = cva(
  "flex flex-row h-9 w-fit items-center justify-center gap-3",
  {
    variants: {
      variant: {
        default: "rounded-lg bg-neutral-100 p-[3px] text-neutral-500",
        underline: "rounded-none border-b bg-background p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "h-[calc(100%-1px)] rounded-md border border-neutral-200 px-2 py-1 text-neutral-950 focus-visible:border-neutral-950 focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-1 focus-visible:ring-neutral-950/50 data-[state=active]:bg-white data-[state=active]:shadow-sm",
        underline:
          "h-full rounded-none border-0 border-b-2 border-transparent bg-background text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const tabsContentVariants = cva("outline-none", {
  variants: {
    variant: {
      default: "flex-1",
      underline: "flex-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TabsProps
  extends VariantProps<typeof tabsVariants>,
    React.ComponentProps<typeof TabsPrimitive.Root> {}

interface TabsListProps
  extends VariantProps<typeof tabsListVariants>,
    React.ComponentProps<typeof TabsPrimitive.List> {}

interface TabsTriggerProps
  extends VariantProps<typeof tabsTriggerVariants>,
    React.ComponentProps<typeof TabsPrimitive.Trigger> {}

interface TabsContentProps
  extends VariantProps<typeof tabsContentVariants>,
    React.ComponentProps<typeof TabsPrimitive.Content> {}

function Tabs({ className, variant, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(tabsVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsList({ className, variant, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, variant, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsContent({ className, variant, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
