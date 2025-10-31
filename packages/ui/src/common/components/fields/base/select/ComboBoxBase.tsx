import { useMeasureVariable } from "@/ui/hooks/useMeasureVariable";
import { cn } from "@/utils/cn";
import { debounce } from "@/utils/debounce";
import { equals } from "@/utils/numbers";
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
  useCallback,
  useEffect,
  useState,
} from "react";
import { ClearMarker } from "../ClearMarker";
import { ErrorMarker } from "../ErrorMarker";
import { ErrorMessages } from "../ErrorMessages";
import { HelpText } from "../HelpText";
import { InputEnd } from "../InputEnd";

export const selectboxVariant = cva("group relative flex flex-col", {
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
  },
);

export interface ComboBoxBaseProps<T>
  extends VariantProps<typeof selectboxVariant>,
    VariantProps<typeof inputVariant> {
  placeholder?: string;
  options: T[];
  errorMessages?: string[];
  handleChange: (value: T | undefined) => void;
  selected: T | undefined;
  idField: keyof T;
  optionField: keyof T;
  searchFunction?: (
    q: string,
    setDisplayedOptions: (options: T[]) => void,
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
  debounceTime?: number;
}
export const ComboBoxBase = observer(function ComboBoxBase<T extends object>(
  rawProps: ComboBoxBaseProps<T>,
) {
  const [q, setQ] = useState<string | undefined>();
  const [displayedOptions, setDisplayedOptions] = useState<T[]>(
    rawProps.options,
  );
  const [searching, setSearching] = useState(false);
  const [debouncedQueryValue, setDebouncedQueryValue] = useState<string | null>(
    null,
  );
  const { ref, variable } = useMeasureVariable(
    "combo-box-width",
    "width",
    true,
  );

  const { className, ...props } = rawProps;

  useEffect(() => {
    setDisplayedOptions(props.options);
  }, [props.options]);

  // need this use effect cause if you debounce the parent function, it wont retain the filter/sort values
  useEffect(() => {
    if (debouncedQueryValue === null) return;
    search(debouncedQueryValue);
  }, [debouncedQueryValue]);
  // Debounce the callback. The search will be triggered after 500ms of inactivity.
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQueryValue(query);
    }, props.debounceTime || 500),
    [],
  );

  const search = async (query: string) => {
    if (!searching) {
      setSearching(true);
    }

    if (!props.searchFunction) {
      if (query == "") {
        setDisplayedOptions(props.options);
        setSearching(false);
        return;
      }
      const searchStr = query.toLowerCase();
      setDisplayedOptions(
        props.options.filter((option) => {
          if (typeof option[props.optionField] === "string") {
            return (option[props.optionField] as string)
              .toLowerCase()
              .includes(searchStr);
          }
        }),
      );
      setSearching(false);
    } else {
      await props.searchFunction(query, (options: T[]) => {
        setDisplayedOptions(options);
        setSearching(false);
      });
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.handleChange(undefined);
  };

  const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

  const virtualOptions = !searching && displayedOptions.length > 30;

  return (
    <div
      className={cn(
        selectboxVariant({
          width: props.width,
          className: className,
        }),
        { errors: hasErrors },
      )}
      ref={ref}
      style={variable}
    >
      <Combobox
        virtual={
          virtualOptions ? { options: displayedOptions as any } : undefined
        }
        value={
          props.selected
            ? (props.selected[props.idField] as number).toString()
            : ""
        }
        onChange={(value: number | string | null) => {
          if (value === null) {
            props.handleChange(undefined);
            return;
          }
          const selected = displayedOptions.find((option) => {
            return equals(option[props.idField] as string | number, value);
          });
          props.handleChange(selected);
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
          }),
        )}
      >
        {({ open }) => (
          <>
            {props.prepend && (
              <InputEnd side="prepend">{props.prepend}</InputEnd>
            )}
            <ComboboxInput
              aria-label={props.placeholder}
              displayValue={() => {
                return props.selected
                  ? (props.selected[props.optionField] as string)
                  : "";
              }}
              onChange={(e) => {
                if (props.debounceTime) {
                  debouncedSearch(e.target.value);
                } else {
                  search(e.target.value);
                }
              }}
              autoFocus={props.focus}
              placeholder={props.placeholder}
              autoComplete="off"
              className={
                "w-full flex-1 rounded-lg border-none bg-transparent px-4 py-1.5 !ring-0"
              }
            />

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
            {props.append && <InputEnd side="append">{props.append}</InputEnd>}

            {!virtualOptions ? (
              <RenderComboBoxOptions<T>
                {...props}
                displayedOptions={displayedOptions}
                displayField={props.optionField}
                selected={props.selected ? [props.selected] : []}
                query={q}
                searching={searching}
                optionComponent={props.optionComponent}
                fitContent={props.fitContent}
              />
            ) : (
              <ComboboxOptions
                transition
                className={cn(
                  `scrollbar-skinny absolute left-0 top-full z-modal mt-1 max-h-64 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`,
                  {
                    "w-[calc(var(--combo-box-width))]": !props.fitContent,
                  },
                  { "w-fit": props.fitContent },
                )}
                modal={false}
              >
                {({ option }) => {
                  const isChecked =
                    props.selected &&
                    props.selected[props.idField] === option[props.idField];
                  return (
                    <ComboboxOption
                      key={option[props.idField] as string}
                      value={option[props.idField] as string}
                      className={cn(
                        itemVariants({
                          state: isChecked ? "checked" : "unchecked",
                        }),
                        className,
                      )}
                    >
                      {props.optionComponent ? (
                        props.optionComponent(option)
                      ) : (
                        <label className="mr-2 cursor-pointer truncate">
                          {option[props.optionField] as string}
                        </label>
                      )}
                      <i
                        className={cn(
                          checkboxVariants({
                            visibility: isChecked ? "check" : "hidden",
                          }),
                        )}
                      ></i>
                    </ComboboxOption>
                  );
                }}
              </ComboboxOptions>
            )}
          </>
        )}
      </Combobox>

      {props.helpText ? <HelpText>{props.helpText}</HelpText> : null}
      {hasErrors && !props.hideMessages && (
        <ErrorMessages errorMessages={props.errorMessages} />
      )}
    </div>
  );
});

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
  },
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
  fitContent?: boolean;
}

export const RenderComboBoxOptions = observer(function RenderComboBoxOptions<
  T extends object,
>(fullProps: RenderComboBoxOptionsProps<T>) {
  const { className, ...props } = fullProps;

  const selectedValues = props.selected?.map((option) => option[props.idField]);

  return (
    <ComboboxOptions
      transition
      className={cn(
        `scrollbar-skinny absolute left-0 top-full z-modal mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`,
        { "w-[calc(var(--combo-box-width))]": !props.fitContent },
        { "w-fit": props.fitContent },
      )}
      modal={false}
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
                  className,
                )}
              >
                {props.optionComponent ? (
                  props.optionComponent(option)
                ) : (
                  <label className="mr-2 cursor-pointer truncate">
                    {option[props.displayField] as string}
                  </label>
                )}
                <i
                  className={cn(
                    checkboxVariants({
                      visibility: isChecked ? "check" : "hidden",
                    }),
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
});
