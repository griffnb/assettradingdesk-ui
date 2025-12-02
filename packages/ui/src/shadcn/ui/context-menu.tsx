"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn([
        /* Layout & Display */
        "flex cursor-default items-center rounded-sm px-2 py-1.5",
        /* Typography */
        "text-sm",
        /* Interaction */
        "outline-hidden select-none",
        /* Inset Variant */
        "data-[inset]:pl-8",
        /* Focus States */
        "focus:bg-neutral-100 focus:text-neutral-900",
        /* Open States */
        "data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900",
        /* SVG Styles */
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-neutral-500 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-50 dark:[&_svg:not([class*='text-'])]:text-neutral-400",
        className,
      ])}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn([
        /* Layout & Display */
        "z-50 min-w-[8rem] overflow-hidden rounded-md p-1",
        /* Origin */
        "origin-(--radix-context-menu-content-transform-origin)",
        /* Colors & Borders */
        "border border-neutral-200 bg-white text-neutral-950 shadow-lg",
        /* Animations */
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        /* Dark Mode */
        "dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-800",
        className,
      ])}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn([
          /* Layout & Display */
          "z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md p-1",
          /* Max Height & Origin */
          "max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin)",
          /* Colors & Borders */
          "border border-neutral-200 bg-white text-neutral-950 shadow-md",
          /* Animations */
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          /* Dark Mode */
          "dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-800",
          className,
        ])}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn([
        /* Layout & Display */
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5",
        /* Typography */
        "text-sm",
        /* Interaction */
        "outline-hidden select-none",
        /* Focus States */
        "focus:bg-neutral-100 focus:text-neutral-900",
        /* Disabled State */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        /* Inset Variant */
        "data-[inset]:pl-8",
        /* Destructive Variant */
        "data-[variant=destructive]:*:[svg]:!text-destructive data-[variant=destructive]:text-red-500 data-[variant=destructive]:focus:bg-red-500/10 data-[variant=destructive]:focus:text-red-500",
        /* SVG Styles */
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-neutral-500 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[variant=destructive]:text-red-900 dark:data-[variant=destructive]:focus:bg-red-900/10 dark:dark:data-[variant=destructive]:focus:bg-red-900/20 dark:data-[variant=destructive]:focus:text-red-900 dark:[&_svg:not([class*='text-'])]:text-neutral-400",
        className,
      ])}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn([
        /* Layout & Display */
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pl-8 pr-2",
        /* Typography */
        "text-sm",
        /* Interaction */
        "outline-hidden select-none",
        /* Focus States */
        "focus:bg-neutral-100 focus:text-neutral-900",
        /* Disabled State */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        /* SVG Styles */
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
        className,
      ])}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn([
        /* Layout & Display */
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pl-8 pr-2",
        /* Typography */
        "text-sm",
        /* Interaction */
        "outline-hidden select-none",
        /* Focus States */
        "focus:bg-neutral-100 focus:text-neutral-900",
        /* Disabled State */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        /* SVG Styles */
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
        className,
      ])}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn([
        /* Typography & Colors */
        "px-2 py-1.5 text-sm font-medium text-neutral-950",
        /* Inset Variant */
        "data-[inset]:pl-8",
        /* Dark Mode */
        "dark:text-neutral-50",
        className,
      ])}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn([
        /* Layout & Colors */
        "-mx-1 my-1 h-px bg-neutral-200",
        /* Dark Mode */
        "dark:bg-neutral-800",
        className,
      ])}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn([
        /* Typography & Colors */
        "ml-auto text-xs tracking-widest text-neutral-500",
        /* Dark Mode */
        "dark:text-neutral-400",
        className,
      ])}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
