import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const styleVariants = cva(
  "pointer-events-none relative inset-y-0 right-0 inline items-center pr-3",
  {
    variants: {
      variant: {
        default: "text-error-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ErrorMarkerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}
export const ErrorMarker = (fullProps: ErrorMarkerProps) => {
  const { className, variant } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <svg
        className="size-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
