import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ChangeEvent, InputHTMLAttributes } from "react";

// Define item style variants for checked and unchecked states
export const checkboxVariant = cva(
  "", // Common styles
  {
    variants: {
      variant: {
        default: [
          "cursor-pointer",
          "size-5 rounded border-gray-300",
          "hover:border-gray-300",
          "focus:ring-gray-200 focus:checked:ring-1 focus:checked:ring-blue-dark-600 focus:checked:ring-offset-0 focus:ring-3 ",
          "checked:text-blue-dark-500 checked:ring-1 checked:ring-blue-dark-600",
          "disabled:text-icon-neutral-disabled disabled:bg-bg-neutral-senary disabled:border-border-neutral-disabled disabled:hover:border-border-neutral-disabled",
        ],
        radio: [
          "cursor-pointer",
          "size-5 rounded-full border-gray-300  hover:border-gray-300 focus:ring-gray-200  ",
          "focus:ring-3 focus:checked:ring-1 focus:checked:ring-blue-dark-600 focus:checked:ring-offset-0",
          "checked:text-blue-dark-500 checked:ring-1 checked:ring-blue-dark-600",
        ],
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CheckboxBaseProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value">,
    VariantProps<typeof checkboxVariant> {
  value: string | number | boolean;
  checkedValue: string | number | boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Define the component with correct generic syntax
const CheckboxBase = observer((rawProps: CheckboxBaseProps) => {
  const { className, value, checkedValue, variant, handleChange, ...props } =
    rawProps;
  const checked = value === checkedValue;

  const type = variant == "radio" ? "radio" : "checkbox";
  return (
    <input
      {...props}
      type={type}
      checked={checked}
      onChange={handleChange}
      className={cn(checkboxVariant({ variant }), className)}
    />
  );
});

export default CheckboxBase;
