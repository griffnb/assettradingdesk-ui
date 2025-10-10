import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { Button } from "../buttons/Button";

const styleVariants = cva(
  "flex flex-row items-center justify-start py-2 shadow-none flex-1",
  {
    variants: {
      variant: {
        default: "hover:bg-bg-neutral-secondary-hover",
        destructive:
          "text-text-error-primary hover:bg-bg-neutral-secondary-hover",
        custom: "hover:opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
interface ActionComponentItemProps extends VariantProps<typeof styleVariants> {
  label: string;
  onClick?: () => void;
  prependIcon?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  children?: ReactNode;
  closePopover?: () => void; // Function to close the popover if it exists
}

export const ActionComponentItem = (props: ActionComponentItemProps) => {
  if (props.isActive === false) {
    return null; // Skip rendering if the action item is not active
  }
  if (props.isLoading) {
    return (
      <div className="cursor-default font-semibold text-text-neutral-primary">
        <i className="fa fa-spinner fa-spin mr-4" />
        Loading...
      </div>
    );
  }

  return (
    <>
      {props.children ? (
        props.children
      ) : (
        <Button
          className={cn(styleVariants({ variant: props.variant }))}
          variant="custom"
          prependIcon={props.prependIcon}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.label}
        </Button>
      )}
    </>
  );
};
