import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

const buttonVariants = cva(
  [
    // Layout & Display
    "inline-flex items-center justify-center gap-2",
    "shrink-0",
    // Typography & Spacing
    "whitespace-nowrap text-sm font-medium",
    // Shape
    "rounded-md outline-none",
    // Transitions
    "transition-all",
    // States
    "disabled:pointer-events-none disabled:opacity-50",
    // Focus States
    "focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring",
    // Invalid States
    "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
    // SVG Styles
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: ["bg-primary text-primary-foreground", "hover:bg-primary/90"],
        destructive: [
          "bg-red-500 text-white",
          "hover:bg-red-500/90",
          "focus-visible:ring-red-500/20",
        ],
        outline: [
          "border bg-white shadow-xs",
          "hover:bg-neutral-100 hover:text-neutral-900",
        ],
        secondary: [
          "bg-neutral-100 text-neutral-900",
          "hover:bg-neutral-100/80",
        ],
        ghost: ["hover:bg-neutral-100 hover:text-neutral-900"],
        link: ["text-neutral-900 underline-offset-4", "hover:underline"],
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function BusyButton({
  className,
  variant,
  size,
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    onClick: () => Promise<void>;
    busyText?: string;
  }) {
  const [busy, setBusy] = React.useState(false);

  const clickHandler = async () => {
    if (busy) return;
    setBusy(true);
    await onClick();

    setBusy(false);
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={clickHandler}
      disabled={busy || props.disabled}
      {...props}
    >
      {busy ? (
        <>
          {props.children} <i className="fa fa-spinner fa-spin flex-none"></i>
        </>
      ) : (
        props.children
      )}
    </Comp>
  );
}

export { BusyButton, Button, buttonVariants };
