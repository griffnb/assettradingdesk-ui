import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ChangeEvent, HTMLAttributes } from "react";

export const radioVariant = cva("", {
  variants: {
    variant: {
      default:
        "text-primary-600 h-4 w-4 rounded-full border-gray-300 bg-gray-100 ring-0 focus:ring-0",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface RadioBaseProps
  extends HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof radioVariant> {
  value: string | number;
  checkedValue: string | number | boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

// Define the component with correct generic syntax
const RadioBase = observer((rawProps: RadioBaseProps) => {
  const { className, value, checkedValue, variant, handleChange, ...props } =
    rawProps;
  const checked = value === checkedValue;
  return (
    <input
      {...props}
      type="radio"
      checked={checked}
      onChange={handleChange}
      className={cn(radioVariant({ variant }), className)}
    />
  );
});

export default RadioBase;
