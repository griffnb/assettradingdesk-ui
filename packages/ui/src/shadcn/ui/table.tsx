import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(["w-full caption-bottom text-sm", className])}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(["[&_tr]:border-b", className])}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(["[&_tr:last-child]:border-0", className])}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn([
        /* Colors & Typography */
        "bg-neutral-100/50 font-medium",
        /* Borders */
        "border-t [&>tr]:last:border-b-0",
        /* Dark Mode */
        "dark:bg-neutral-800/50",
        className,
      ])}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn([
        /* Borders & Transitions */
        "border-b transition-colors",
        /* Hover State */
        "hover:bg-neutral-100/50",
        /* Selected State */
        "data-[state=selected]:bg-neutral-100",
        /* Dark Mode */
        "dark:hover:bg-neutral-800/50 dark:data-[state=selected]:bg-neutral-800",
        className,
      ])}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn([
        /* Layout & Typography */
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap",
        /* Colors */
        "text-neutral-950",
        /* Checkbox Handling */
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        /* Dark Mode */
        "dark:text-neutral-50",
        className,
      ])}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn([
        /* Layout */
        "p-2 align-middle whitespace-nowrap",
        /* Checkbox Handling */
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      ])}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn([
        /* Typography & Colors */
        "text-neutral-500 mt-4 text-sm",
        /* Dark Mode */
        "dark:text-neutral-400",
        className,
      ])}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
