import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ChangeEvent, HTMLAttributes } from "react";

const toggleStyles = cva(
  " after:border after:rounded-full after:h-4 after:w-4 after:transition-all relative peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px]",
  {
    variants: {
      variant: {
        default: [
          "bg-gray-200  after:bg-white after:border-gray-300",
          "peer-focus:ring-blue-300 peer-checked:after:border-white peer-checked:bg-blue-dark-600 peer-focus:ring-1 ",
        ],
        custom: "",
      },
      size: {
        small: "w-9 h-5",
        medium: "w-11 h-6 ",
        large: "w-14 h-7",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    },
  },
);

const labelStyles = cva("ms-3 text-sm font-medium", {
  variants: {
    variant: {
      default: "text-gray-900",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
interface ToggleInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof toggleStyles> {
  label?: string;
  checkedValue: string | number | boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number | boolean;
}

export const ToggleInput = (rawProps: ToggleInputProps) => {
  const {
    className,
    value,
    checkedValue,
    variant,
    size,
    handleChange,
    ...props
  } = rawProps;
  const checked = value === checkedValue;

  return (
    <label className="mb-5 inline-flex cursor-pointer items-center">
      <input
        {...props}
        type="checkbox"
        onChange={handleChange}
        className="peer sr-only"
        checked={checked}
      />
      <div
        className={cn(toggleStyles({ variant, size }), className || "")}
      ></div>
      <span className={cn(labelStyles({ variant }), className || "")}>
        {props.label}
      </span>
    </label>
  );
};
