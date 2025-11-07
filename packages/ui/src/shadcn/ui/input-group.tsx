"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Button } from "@/ui/shadcn/ui/button";
import { Input } from "@/ui/shadcn/ui/input";
import { Textarea } from "@/ui/shadcn/ui/textarea";
import { cn } from "@/ui/shadcn/utils";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn([
        /* Layout & Display */
        "group/input-group relative flex w-full items-center rounded-md",
        /* Borders & Shadows */
        "border border-neutral-200 shadow-xs",
        /* Sizing */
        "h-9 min-w-0 has-[>textarea]:h-auto",
        /* Transitions */
        "outline-none transition-[color,box-shadow]",
        /* Alignment Variants */
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        /* Focus State */
        "has-[[data-slot=input-group-control]:focus-visible]:border-neutral-950 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-neutral-950/50",
        /* Error State */
        "has-[[data-slot][aria-invalid=true]]:border-red-500 has-[[data-slot][aria-invalid=true]]:ring-red-500/20",
        /* Dark Mode Base */
        "dark:bg-neutral-200/30 dark:border-neutral-800 dark:dark:bg-neutral-800/30",
        /* Dark Mode Focus */
        "dark:has-[[data-slot=input-group-control]:focus-visible]:border-neutral-300 dark:has-[[data-slot=input-group-control]:focus-visible]:ring-neutral-300/50",
        /* Dark Mode Error */
        "dark:has-[[data-slot][aria-invalid=true]]:ring-red-900/20 dark:has-[[data-slot][aria-invalid=true]]:border-red-900 dark:dark:has-[[data-slot][aria-invalid=true]]:ring-red-900/40",
        className,
      ])}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  [
    /* Layout & Typography */
    "flex h-auto items-center justify-center gap-2 py-1.5 text-sm font-medium",
    /* Colors & Interaction */
    "text-neutral-500 cursor-text select-none",
    /* SVG & KBD Styles */
    "[&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)]",
    /* Disabled State */
    "group-data-[disabled=true]/input-group:opacity-50",
    /* Dark Mode */
    "dark:text-neutral-400",
  ],
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  [
    /* Layout & Typography */
    "flex gap-2 items-center text-sm",
    /* Shadow */
    "shadow-none",
  ],
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
);

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn([
        /* Layout & Typography */
        "flex items-center gap-2 text-sm",
        /* Colors */
        "text-neutral-500",
        /* SVG Styles */
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        /* Dark Mode */
        "dark:text-neutral-400",
        className,
      ])}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn([
        /* Layout */
        "flex-1 rounded-none border-0",
        /* Colors */
        "bg-transparent",
        /* Shadows & Focus */
        "shadow-none focus-visible:ring-0",
        /* Dark Mode */
        "dark:bg-transparent",
        className,
      ])}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn([
        /* Layout */
        "flex-1 resize-none rounded-none border-0 py-3",
        /* Colors */
        "bg-transparent",
        /* Shadows & Focus */
        "shadow-none focus-visible:ring-0",
        /* Dark Mode */
        "dark:bg-transparent",
        className,
      ])}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
