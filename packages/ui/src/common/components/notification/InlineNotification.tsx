import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, ReactNode } from "react";

const styleVariants = cva(
  " flex flex-row items-start rounded-lg border-2 p-4 gap-x-2",
  {
    variants: {
      variant: {
        primary: "border-border-brand-quinary bg-bg-neutral-primary",
        secondary: "border-border-brand-quinary bg-bg-brand-primary",
        success: " border-border-success-primary bg-bg-success-primary",
        warning: "border-border-warning-quaternary bg-bg-warning-primary",
        error: "border-border-error-quaternary bg-bg-error-primary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const iconVariants = cva(
  "flex items-center justify-center self-start text-2xl xl:text-3xl mt-1",
  {
    variants: {
      variant: {
        primary: "text-icon-brand-primary",
        secondary: "text-icon-brand-primary",
        success: "text-icon-success-secondary",
        warning: "text-icon-warning-tertiary",
        error: " text-icon-error-secondary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
interface InlineNotificationProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  title: string;
  message: string;
  icon: ReactNode;
  onClose?: () => void;
}

export const InlineNotification = observer((props: InlineNotificationProps) => {
  const { variant, className } = props;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <div className={cn(iconVariants({ variant }))}>{props.icon}</div>
      <div className="flex w-full flex-col justify-start">
        <span className="text-xl font-semibold text-text-neutral-secondary">
          {props.title}
        </span>
        <span className="text-text-neutral-secondary">{props.message}</span>
      </div>
      {props.children && <div className="mt-4">{props.children}</div>}
      {props.onClose && (
        <i
          onClick={() => {
            props.onClose?.();
          }}
          className="u u-x-close ml-auto mr-2 mt-2 cursor-pointer self-start text-lg text-icon-neutral-quaternary hover:opacity-70"
        />
      )}
    </div>
  );
});
