import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const styleVariants = cva(
  "h-10 pl-3 py-2 justify-start items-center gap-1 inline-flex uppercase font-semibold text-base",
  {
    variants: {
      variant: {
        light: "text-text-neutral-quaternary",
        dark: "text-white",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  },
);

interface NavSectionLabelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  label: string;
}
export const NavSectionLabel = (fullProps: NavSectionLabelProps) => {
  const { className, variant, ...props } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <label>{props.label}</label>
    </div>
  );
};
