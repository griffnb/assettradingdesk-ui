import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn([
          /* Layout & Display */
          "z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md p-1",
          /* Max Height & Origin */
          "max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin)",
          /* Colors & Borders */
          "bg-white text-neutral-950 border border-neutral-200 shadow-md",
          /* Animations */
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          /* Dark Mode */
          "dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-800",
          className,
        ])}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
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
        "data-[variant=destructive]:text-red-500 data-[variant=destructive]:focus:bg-red-500/10 data-[variant=destructive]:focus:text-red-500 data-[variant=destructive]:*:[svg]:!text-destructive",
        /* SVG Styles */
        "[&_svg:not([class*='text-'])]:text-neutral-500 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[variant=destructive]:text-red-900 dark:data-[variant=destructive]:focus:bg-red-900/10 dark:dark:data-[variant=destructive]:focus:bg-red-900/20 dark:data-[variant=destructive]:focus:text-red-900 dark:[&_svg:not([class*='text-'])]:text-neutral-400",
        className,
      ])}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn([
        /* Layout & Display */
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8",
        /* Typography */
        "text-sm",
        /* Interaction */
        "outline-hidden select-none",
        /* Focus States */
        "focus:bg-neutral-100 focus:text-neutral-900",
        /* Disabled State */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        /* SVG Styles */
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
        className,
      ])}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn([
        /* Layout & Display */
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8",
        /* Typography */
        "text-sm",
        /* Interaction */
        "outline-hidden select-none",
        /* Focus States */
        "focus:bg-neutral-100 focus:text-neutral-900",
        /* Disabled State */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        /* SVG Styles */
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
        className,
      ])}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
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

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn([
        /* Layout & Colors */
        "bg-neutral-200 -mx-1 my-1 h-px",
        /* Dark Mode */
        "dark:bg-neutral-800",
        className,
      ])}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn([
        /* Typography & Colors */
        "text-neutral-500 ml-auto text-xs tracking-widest",
        /* Dark Mode */
        "dark:text-neutral-400",
        className,
      ])}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn([
        /* Layout & Display */
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5",
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
        "[&_svg:not([class*='text-'])]:text-neutral-500 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        /* Dark Mode */
        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-50 dark:[&_svg:not([class*='text-'])]:text-neutral-400",
        className,
      ])}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn([
        /* Layout & Display */
        "z-50 min-w-[8rem] overflow-hidden rounded-md p-1",
        /* Origin */
        "origin-(--radix-dropdown-menu-content-transform-origin)",
        /* Colors & Borders */
        "bg-white text-neutral-950 border border-neutral-200 shadow-lg",
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
