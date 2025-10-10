import { cn } from "@/utils/cn";
import { equals, inArray } from "@/utils/numbers";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import React, {
  HTMLAttributes,
  JSX,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ClearMarker } from "../ClearMarker";
import { ErrorMarker } from "../ErrorMarker";
import { ErrorMessages } from "../ErrorMessages";
import { HelpText } from "../HelpText";
import { InputEnd } from "../InputEnd";

export const selectboxVariant = cva("relative flex flex-col", {
  variants: {
    width: {
      default: "",
      custom: "",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

export const inputVariant = cva(
  "relative flex w-full cursor-pointer flex-row items-center justify-center select-none", // Common styles
  {
    variants: {
      input: {
        default: [
          "rounded-md border-border-neutral-primary border bg-white h-9 shadow-sm text-text-neutral-primary group-[.active]:hover:bg-white hover:bg-bg-neutral-senary",
          "group-[.errors]:border-error-500",
        ],
        filter: [
          "border border-border-neutral-primary bg-white pl-2 py-2.5 shadow-sm rounded-lg font-semibold text-text-neutral-secondary group-[.active]:hover:bg-white hover:bg-bg-neutral-senary",
          "group-[.errors]:border-error-500",
        ],
        highlight: [
          "border-2 border-border-neutral-primary bg-white pl-2 py-2.5 shadow-sm rounded-lg font-semibold text-text-neutral-secondary group-[.active]:hover:bg-white hover:bg-bg-neutral-senary",
          "group-[.errors]:border-error-500",
          "group-[.active]:border-border-brand-secondary",
        ],
        custom: "",
      },
    },
    defaultVariants: {
      input: "default",
    },
  }
);

export interface MultiComboBoxBaseProps<T>
  extends VariantProps<typeof selectboxVariant>,
    VariantProps<typeof inputVariant> {
  placeholder?: string;
  options: T[];
  errorMessages?: string[];
  handleChange: (values: T[]) => void;
  selected: T[] | undefined;
  idField: keyof T;
  optionField: keyof T;
  searchFunction?: (
    q: string,
    setDisplayedOptions: (options: T[]) => void
  ) => Promise<void>;
  showClear?: boolean | undefined;
  prepend?: ReactNode;
  append?: ReactNode;
  noSearch?: boolean;
  toggleSelect?: boolean;
  hideMessages?: boolean;
  className?: string;
  optionComponent?: (option: T) => JSX.Element;
  displayComponent?: (option: T) => JSX.Element;
  fitContent?: boolean;
  optionHeight?: string;
  helpText?: ReactNode;
  focus?: boolean;
}
export const MultiComboBoxBase = observer(
  <T extends object>(rawProps: MultiComboBoxBaseProps<T>) => {
    const [q, setQ] = useState<string | undefined>();
    const [displayedOptions, setDisplayedOptions] = useState<T[]>(
      rawProps.options
    );
    const [searching, setSearching] = useState(false);

    const { className, ...props } = rawProps;

    useEffect(() => {
      setDisplayedOptions(props.options);
    }, [props.options]);

    const search = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setQ(event.target.value);

      if (!searching) {
        setSearching(true);
      }

      if (!props.searchFunction) {
        if (event.target.value == "") {
          setDisplayedOptions(props.options);
          setSearching(false);
          return;
        }
        const searchStr = event.target.value.toLowerCase();
        setDisplayedOptions(
          props.options.filter((option) => {
            if (typeof option[props.optionField] === "string") {
              return (option[props.optionField] as string)
                .toLowerCase()
                .includes(searchStr);
            }
          })
        );
        setSearching(false);
      } else {
        await props.searchFunction(event.target.value, (options: T[]) => {
          setDisplayedOptions(options);
          setSearching(false);
        });
      }
    };

    const removeOption = (e: React.MouseEvent, option: T) => {
      e.stopPropagation();
      e.preventDefault();
      const newSelected = props.selected?.filter(
        (selectedOption) =>
          selectedOption[props.idField] != option[props.idField]
      );

      props.handleChange(newSelected || []);
    };

    const clearSelection = (e: React.MouseEvent) => {
      e.stopPropagation();
      props.handleChange([]);
    };

    const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

    const selectedIDs =
      props.selected?.map((item) =>
        (item[props.idField] as string).toString()
      ) || [];
    const hasSelectedItems = selectedIDs.length > 0;

    return (
      <div
        className={cn(
          selectboxVariant({
            width: props.width,
            className: className,
          }),
          { errors: hasErrors }
        )}
      >
        <Combobox
          value={selectedIDs}
          multiple={true}
          onChange={(values: string[]) => {
            if (values === null) {
              props.handleChange([]);
              return;
            }
            const newSelected = displayedOptions.filter((option) => {
              if (Array.isArray(values)) {
                return inArray(
                  values,
                  option[props.idField] as string | number
                );
              } else {
                return equals(
                  option[props.idField] as string | number,
                  values as string | number
                );
              }
            });

            props.handleChange([...(props.selected || []), ...newSelected]);
          }}
          onClose={() => setQ("")}
          immediate={true}
          by={(a: string | number, z: string | number) => {
            return equals(a, z);
          }}
          as="div"
          className={cn(
            inputVariant({
              input: props.input,
            })
          )}
        >
          {({ open }) => (
            <>
              {props.prepend && (
                <InputEnd side="prepend">{props.prepend}</InputEnd>
              )}
              <ComboboxInput
                aria-label={props.placeholder}
                displayValue={() => q || ""}
                onChange={search}
                autoFocus={props.focus}
                placeholder={props.placeholder}
                autoComplete="off"
                className={
                  "w-full flex-1 rounded-lg border-none bg-transparent px-4 py-1.5 !ring-0"
                }
              />
              {hasSelectedItems ? (
                <div className="mr-3 flex flex-row flex-wrap gap-x-1 overflow-y-auto overflow-x-hidden">
                  {props.selected?.map((option, index) => (
                    <div
                      key={index}
                      className="flex cursor-default flex-row items-center justify-center gap-x-1 text-wrap rounded-md border border-gray-300 bg-gray-100 py-1 pl-2 pr-1 text-sm"
                    >
                      <span className="text-nowrap leading-3">
                        {option[props.optionField] as string}
                      </span>
                      <div
                        className="mr-1 flex size-3 cursor-pointer items-center justify-center text-base"
                        onClick={(e) => {
                          removeOption(e, option);
                        }}
                      >
                        <i className="fas fa-xmark"></i>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="self-center justify-self-center pl-2 text-gray-500">
                  {props.placeholder}
                </span>
              )}

              <div className="ml-auto flex flex-row-reverse gap-x-2 text-right">
                {hasErrors ? (
                  <ErrorMarker />
                ) : props.selected ? (
                  props.showClear && (
                    <ClearMarker
                      clearSelection={clearSelection}
                      variant="default"
                    />
                  )
                ) : null}

                <ComboboxButton className="flex items-center">
                  {open ? (
                    <i className="fas fa-chevron-up mr-3"></i>
                  ) : (
                    <i className="fas fa-chevron-down mr-3"></i>
                  )}
                </ComboboxButton>
              </div>
              {props.append && (
                <InputEnd side="append">{props.append}</InputEnd>
              )}

              <RenderComboBoxOptions<T>
                {...props}
                displayedOptions={displayedOptions}
                displayField={props.optionField}
                selected={props.selected || []}
                query={q}
                searching={searching}
                optionComponent={props.optionComponent}
              />
            </>
          )}
        </Combobox>

        {props.helpText ? <HelpText>{props.helpText}</HelpText> : null}
        {hasErrors && !props.hideMessages && (
          <ErrorMessages errorMessages={props.errorMessages} />
        )}
      </div>
    );
  }
);

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

// Define the component props
interface RenderComboBoxOptionsProps<T>
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  displayedOptions: T[];
  idField: keyof T;
  displayField: keyof T;
  selected: T[] | undefined;
  query: string | undefined;
  searching: boolean;
  optionComponent?: (option: T) => JSX.Element;
}

export const RenderComboBoxOptions = <T extends object>(
  fullProps: RenderComboBoxOptionsProps<T>
) => {
  const { className, ...props } = fullProps;

  const selectedValues = props.selected?.map((option) => option[props.idField]);

  return (
    <ComboboxOptions
      transition
      className="absolute left-0 top-full z-modal mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
    >
      <div className="flex select-none flex-col gap-y-0.5 overflow-y-auto p-2">
        {props.searching ? (
          <label
            className={cn(itemVariants({ state: "unchecked" }), className)}
          >
            <i className="fa fa-spinner fa-spin mr-2" />
            Searching...
          </label>
        ) : props.displayedOptions.length > 0 ? (
          props.displayedOptions.map((option) => {
            const isChecked =
              props.selected && selectedValues?.includes(option[props.idField]);

            return (
              <ComboboxOption
                key={option[props.idField] as string}
                value={option[props.idField] as string}
                className={cn(
                  itemVariants({ state: isChecked ? "checked" : "unchecked" }),
                  className
                )}
              >
                {props.optionComponent ? (
                  props.optionComponent(option)
                ) : (
                  <label className="mr-2 cursor-pointer text-nowrap">
                    {option[props.displayField] as string}
                  </label>
                )}
                <i
                  className={cn(
                    checkboxVariants({
                      visibility: isChecked ? "check" : "hidden",
                    })
                  )}
                ></i>
              </ComboboxOption>
            );
          })
        ) : props.query && props.query != "" ? (
          <li className={cn(itemVariants({ state: "unchecked" }), className)}>
            No Options Available
          </li>
        ) : (
          <li className={cn(itemVariants({ state: "unchecked" }), className)}>
            Search For Options
          </li>
        )}
      </div>
    </ComboboxOptions>
  );
};
