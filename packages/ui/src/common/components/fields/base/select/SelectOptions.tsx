import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, JSX } from "react";

// Define item style variants for checked and unchecked states
const itemVariants = cva(
  "flex cursor-pointer flex-row items-center px-3 py-2 rounded-md w-full", // Common styles
  {
    variants: {
      state: {
        unchecked: "font-base hover:bg-bg-neutral-active",
        checked: "bg-bg-neutral-active font-base", // Checked state styles
      },
    },
    defaultVariants: {
      state: "unchecked",
    },
  }
);

// Define checkbox icon visibility styles
const checkboxVariants = cva("", {
  variants: {
    visibility: {
      check: "fas fa-check ml-auto mr-2 text-fg-brand-primary", // Show check icon
      hidden: "hidden", // Hide icon
    },
  },
  defaultVariants: {
    visibility: "hidden",
  },
});

type HelpTextOption<T> = T & { helpText?: string };
// Define the component props
interface SelectOptionsProps<T>
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  displayedOptions: HelpTextOption<T>[];
  idField: keyof T;
  displayField: keyof T;
  selected: T[] | undefined;
  show: boolean;
  toggleOption(option: T): void;
  showNoOptions: boolean;
  searching: boolean;
  optionComponent?: (option: T) => JSX.Element;
}

export const SelectOptions = <T extends object>(
  fullProps: SelectOptionsProps<T>
) => {
  const { className, ...props } = fullProps;

  const selectedValues = props.selected?.map((option) => option[props.idField]);

  return (
    <div className="flex select-none flex-col gap-y-0.5 overflow-y-auto p-2">
      {props.searching ? (
        <li className={cn(itemVariants({ state: "unchecked" }), className)}>
          <i className="fa fa-spinner fa-spin mr-2" />
          Searching...
        </li>
      ) : props.displayedOptions.length > 0 ? (
        props.displayedOptions.map((option, index) => {
          const isChecked =
            props.selected && selectedValues?.includes(option[props.idField]);

          return (
            <div
              key={index}
              className={cn(
                itemVariants({ state: isChecked ? "checked" : "unchecked" }),
                className
              )}
              onClick={() => props.toggleOption(option)}
            >
              {props.optionComponent ? (
                props.optionComponent(option)
              ) : (
                <label className="mr-2 flex cursor-pointer flex-col text-nowrap">
                  {option[props.displayField] as string}
                  {option.helpText ? (
                    <span className="text-xs text-gray-500">
                      {option.helpText}
                    </span>
                  ) : null}
                </label>
              )}
              <i
                className={cn(
                  checkboxVariants({
                    visibility: isChecked ? "check" : "hidden",
                  })
                )}
              ></i>
            </div>
          );
        })
      ) : (
        props.showNoOptions && (
          <li className={cn(itemVariants({ state: "unchecked" }), className)}>
            No Options Available
          </li>
        )
      )}
    </div>
  );
};
