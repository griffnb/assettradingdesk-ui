import { cn } from "@/utils/cn";
import { MenuItem } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";

import {
  HTMLAttributeAnchorTarget,
  HTMLAttributes,
  ReactNode,
  useState,
} from "react";

const styleVariants = cva(
  "flex  flex-row items-center gap-x-3 text-nowrap cursor-pointer self-stretch",
  {
    variants: {
      variant: {
        default: [
          "text-text-neutral-secondary",
          "hover:bg-bg-neutral-secondary",
        ],
        action: ["text-text-brand-primary", "hover:bg-fg-brand-quaternary"],
        warning: ["text-fg-warning-primary", "hover:bg-bg-warning-primary"],
        destructive: ["text-fg-error-primary", "hover:bg-bg-error-primary"],
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface MenuOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  prependIcon?: ReactNode;
  appendIcon?: ReactNode;
  children: ReactNode;
  action?: () => Promise<void>;
  onClick?: () => void;
  as?: "div" | "a";
  href?: string; // Required for Link when `as` is Link
  target?: HTMLAttributeAnchorTarget;
}
// Can only be used inside of headlessUI menu components
export const MenuOption = observer((fullProps: MenuOptionProps) => {
  const {
    className,
    variant,
    prependIcon,
    appendIcon,
    as: Component = "div",
    href,
    size,
    ...props
  } = fullProps;
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (props.action) {
      if (busy) return;
      setBusy(true);
      await props.action();
      setBusy(false);
    } else {
      if (props.onClick) {
        props.onClick();
      }
    }
  };

  const content = (
    <>
      {busy && (
        <div className="flex flex-col items-center justify-center font-semibold">
          <i className="fa fa-spinner fa-spin p-1"></i>
        </div>
      )}
      {prependIcon && !busy && (
        <div className="flex w-6 flex-col items-center justify-center font-semibold">
          {prependIcon}
        </div>
      )}
      {props.children}
      {appendIcon && (
        <div className="flex w-6 flex-col items-center justify-center font-semibold">
          {appendIcon}
        </div>
      )}
    </>
  );

  return (
    <MenuItem>
      {href ? (
        <Component
          href={href}
          target={props.target}
          className={cn(styleVariants({ variant, size, className }))}
          onClick={onClick}
        >
          {content}
        </Component>
      ) : (
        <div
          {...props}
          onClick={onClick}
          className={cn(styleVariants({ variant, size, className }))}
        >
          {content}
        </div>
      )}
    </MenuItem>
  );
});
