import { BadgeColorKeys } from "@/ui/common/components/badge/Badge";
import { CheckboxInput } from "@/ui/common/components/fields/CheckboxInput";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";

interface FilterCheckboxProps<T> extends VariantProps<typeof styleVariants> {
  record: T;
  labelField: keyof T & string;

  icon?: string;
  color?: BadgeColorKeys;
  checked: boolean;
  handleChange: (checked: boolean) => void;
  className?: string;
}

const styleVariants = cva("flex flex-row items-center cursor-pointer", {
  variants: {
    variant: {
      default: "",
    },
  },
});

export const FilterCheckbox = observer(function FilterCheckbox<T>(
  rawProps: FilterCheckboxProps<T>,
) {
  const {
    record,
    labelField,
    checked,
    icon,
    variant,
    handleChange,
    className,
  } = rawProps;

  return (
    <div
      className={cn(
        styleVariants({
          variant,
          className,
        }),
      )}
      onClick={(e) => {
        e.stopPropagation();
        handleChange(!checked);
      }}
    >
      <CheckboxInput
        handleChange={() => {}}
        uncheckedValue={false}
        checkedValue={true}
        value={checked}
        className="cursor-pointer gap-x-0"
        //noPropagation={true}
      />
      <span className="flex flex-row items-center rounded-lg px-2 text-sm font-normal">
        <span
          data-checked={checked}
          className="truncate text-sm text-text-neutral-primary data-[checked=true]:font-semibold"
        >
          {record[labelField] as unknown as string}
        </span>
      </span>
    </div>
  );
});
