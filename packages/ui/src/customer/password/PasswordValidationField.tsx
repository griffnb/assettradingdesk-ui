import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";

interface PasswordValidationFieldProps
  extends VariantProps<typeof styleVariants> {
  label: string;
  className?: string;
}

const styleVariants = cva("inline-flex items-center justify-start gap-1", {
  variants: {
    variant: {
      valid: "text-text-neutral-tertiary",
      empty: "text-text-neutral-tertiary",
      invalid: "text-text-neutral-quaternary",
    },
  },
  defaultVariants: {
    variant: "empty",
  },
});

const iconVariant = cva("u u-check-circle-solid flex-none", {
  variants: {
    variant: {
      valid: "text-text-success-primary",
      empty: "text-gray-modern-400",
      invalid: "text-fg-error-primary",
    },
  },
  defaultVariants: {
    variant: "empty",
  },
});
export const PasswordValidationField = observer(
  (props: PasswordValidationFieldProps) => {
    const { variant, label, className } = props;
    return (
      <div className={cn(styleVariants({ variant, className }))}>
        <i className={cn(iconVariant({ variant, className }))} />
        <div className="text-sm font-semibold leading-tight">{label}</div>
      </div>
    );
  },
);
