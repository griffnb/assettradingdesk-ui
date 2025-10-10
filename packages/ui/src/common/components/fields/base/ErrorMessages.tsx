import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const styleVariants = cva("", {
  variants: {
    variant: {
      default: "text-xs text-error-600 mt-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ErrorMessagesProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  errorMessages: string[] | undefined;
}
export const ErrorMessages = (fullProps: ErrorMessagesProps) => {
  const { className, variant, ...props } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      {props.errorMessages &&
        props.errorMessages.map((msg, index) => (
          <span key={index}>
            {msg}
            <br />
          </span>
        ))}
    </div>
  );
};
