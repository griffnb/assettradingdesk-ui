import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn([
        /* Layout & Display */
        "flex h-9 items-center gap-1 rounded-md p-1",
        /* Colors & Borders */
        "border border-neutral-200 bg-white shadow-xs",
        /* Dark Mode */
        "dark:bg-neutral-950 dark:border-neutral-800",
        className,
      ])}
      {...props}
    />
  );
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn([
        /* Layout & Display */
        "flex items-center rounded-sm px-2 py-1",
        /* Typography */
        "text-sm font-medium",
        /* Interaction */
        "outline-hidden select-none",
        /* Focus States */
        "focus:bg-neutral-100 focus:text-neutral-900",
        /* Open States */
        "data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-50",
        className,
      ])}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn([
          /* Layout & Display */
          "z-50 min-w-[12rem] overflow-hidden rounded-md p-1",
          /* Origin */
          "origin-(--radix-menubar-content-transform-origin)",
          /* Colors & Borders */
          "border border-neutral-200 bg-white text-neutral-950 shadow-md",
          /* Animations */
          "data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          /* Dark Mode */
          "dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-800",
          className,
        ])}
        {...props}
      />
    </MenubarPortal>
  );
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
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

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn([
        /* Layout & Display */
        "rounded-xs relative flex cursor-default items-center gap-2 py-1.5 pl-8 pr-2",
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
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn([
        /* Layout & Display */
        "rounded-xs relative flex cursor-default items-center gap-2 py-1.5 pl-8 pr-2",
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
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn([
        /* Typography & Spacing */
        "px-2 py-1.5 text-sm font-medium",
        /* Inset Variant */
        "data-[inset]:pl-8",
        className,
      ])}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
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

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
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

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn([
        /* Layout & Display */
        "flex cursor-default items-center rounded-sm px-2 py-1.5",
        /* Typography */
        "text-sm",
        /* Interaction */
        "select-none outline-none",
        /* Inset Variant */
        "data-[inset]:pl-8",
        /* Focus States */
        "focus:bg-neutral-100 focus:text-neutral-900",
        /* Open States */
        "data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-50",
        className,
      ])}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn([
        /* Layout & Display */
        "z-50 min-w-[8rem] overflow-hidden rounded-md p-1",
        /* Origin */
        "origin-(--radix-menubar-content-transform-origin)",
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

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
