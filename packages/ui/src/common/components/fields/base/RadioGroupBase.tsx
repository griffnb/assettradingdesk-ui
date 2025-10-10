import { IConstant } from "@/models/types/constants";
import { cn } from "@/utils/cn";
import { equals } from "@/utils/numbers";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";

const labelVariant = cva("flex grow cursor-pointer flex-row items-center ", {
  variants: {
    label_variant: {
      default: [
        "bg-white rounded-lg border-2 border-border-neutral-primary gap-3 px-3 py-2",
        "hover:bg-primary-50 has-[:checked]:border-border-brand-secondary",
      ],
    },
  },
  defaultVariants: {
    label_variant: "default",
  },
});

const radioVariant = cva("", {
  variants: {
    radio_variant: {
      default:
        "size-5 cursor-pointer focus:border-none border border-border-neutral-primary bg-white focus:ring-0 focus:ring-offset-0 ring-transparent",
    },
  },
  defaultVariants: {
    radio_variant: "default",
  },
});
export interface RadioGroupBaseProps
  extends VariantProps<typeof labelVariant>,
    VariantProps<typeof radioVariant> {
  options: IConstant[];
  checkedValue: string | number | boolean | undefined;
  onChange: (value: IConstant) => void;
  name: string;
  labelClassName?: string;
  radioClassName?: string;
}

// Define the component with correct generic syntax
export const RadioGroupBase = observer((rawProps: RadioGroupBaseProps) => {
  const { label_variant, radio_variant, ...props } = rawProps;

  return (
    <>
      {props.options.map((option) => {
        return (
          <div
            key={option.id}
            className={cn(
              labelVariant({ label_variant }),
              props.labelClassName
            )}
            onClick={() => props.onChange(option)}
          >
            <input
              type="radio"
              name={props.name}
              value={option.id}
              checked={equals(option.id, props.checkedValue as string | number)}
              onChange={() => props.onChange(option)}
              className={cn(
                radioVariant({ radio_variant }),
                props.radioClassName
              )}
            />
            <div className="flex flex-col items-start">
              <h5>{option.label}</h5>
            </div>
          </div>
        );
      })}
    </>
  );
});
