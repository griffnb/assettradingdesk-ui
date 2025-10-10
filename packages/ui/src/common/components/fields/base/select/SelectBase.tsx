import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import React, { JSX, ReactNode, useEffect, useRef, useState } from "react";
import { ClearMarker } from "../ClearMarker";
import { ErrorMarker } from "../ErrorMarker";
import { ErrorMessages } from "../ErrorMessages";
import { HelpText } from "../HelpText";
import { InputEnd } from "../InputEnd";
import { SelectOptions } from "./SelectOptions";

// Define item style variants for checked and unchecked states
export const selectboxVariant = cva(
  "relative flex flex-col group", // Common styles
  {
    variants: {
      width: {
        default: "min-w-[142px]",
        custom: "",
      },
    },
    defaultVariants: {
      width: "default",
    },
  }
);

export const inputVariant = cva(
  "relative flex w-full cursor-pointer flex-col items-center justify-center select-none", // Common styles
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
          "group-data-[disabled=true]:hover:bg-inherit",
        ],
        custom: "",
      },
    },
    defaultVariants: {
      input: "default",
    },
  }
);

export const searchVariant = cva(
  "mx-2 flex h-8 w-full grow flex-row items-center rounded border border-solid px-2 py-1 text-xs shadow-none focus:border",
  {
    variants: {
      input: {
        default:
          "border-gray-300 placeholder:text-gray-500 focus:border-blue-dark-500",
        filter:
          "border border-border-neutral-primary bg-white pl-4 py-2.5 shadow-sm rounded-lg font-semibold text-text-neutral-secondary group-[.active]:hover:bg-white hover:bg-bg-neutral-senary",
        highlight:
          "border border-border-neutral-primary bg-white pl-4 py-2.5 shadow-sm rounded-lg font-semibold text-text-neutral-secondary group-[.active]:hover:bg-white hover:bg-bg-neutral-senary",
        custom: "",
      },
    },
    defaultVariants: {
      input: "default",
    },
  }
);

export interface SelectBaseProps<T>
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
  disabled?: boolean;
}
export const SelectBase = observer(
  <T extends object>(rawProps: SelectBaseProps<T>) => {
    const [isActive, setIsActive] = useState(false);
    const [q, setQ] = useState("");
    const [displayedOptions, setDisplayedOptions] = useState<T[]>(
      rawProps.options
    );
    const [searching, setSearching] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null); // Step 1 with type annotation
    const wrapperRef = useRef<HTMLDivElement>(null); // Step 1 with type annotation

    const { className, ...props } = rawProps;

    useEffect(() => {
      // Function to call on click event
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsActive(false);
        }
      };

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside); // Step 2
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside); // Step 4
      };
    }, []); // Empty dependency array ensures that effect runs only once

    useEffect(() => {
      setDisplayedOptions(props.options);
    }, [props.options]);

    const showDropdown = () => {
      if (isActive || props.disabled) return;
      setIsActive(true);
      inputRef.current?.focus();
    };

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

    const toggleOption = (option: T) => {
      if (
        !props.selected ||
        props.selected[props.idField] != option[props.idField]
      ) {
        props.handleChange(option);
      } else {
        if (props.toggleSelect) {
          props.handleChange(undefined);
        }
      }

      setIsActive(false);
    };

    const clearSelection = (e: React.MouseEvent) => {
      e.stopPropagation();
      props.handleChange(undefined);
    };

    const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

    return (
      <div
        ref={wrapperRef}
        className={cn(
          selectboxVariant({
            width: props.width,
            className: className,
          }),
          { errors: hasErrors },
          { active: isActive }
        )}
        onClick={showDropdown}
        data-disabled={props.disabled}
      >
        <div
          className={cn(
            inputVariant({
              input: props.input,
            })
          )}
          data-slot="select-base-input"
        >
          <div
            className={`flex size-full items-center ${
              !props.selected ? "text-gray-500" : ""
            }`}
          >
            {props.prepend && (
              <InputEnd side="prepend">{props.prepend}</InputEnd>
            )}

            <div className="truncate pl-2">
              {props.selected
                ? props.displayComponent
                  ? props.displayComponent(props.selected)
                  : (props.selected[props.optionField] as string)
                : props.placeholder}
            </div>

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
              {!props.disabled &&
                (isActive ? (
                  <i
                    className="fas fa-chevron-up mr-3"
                    data-slot="select-base-chevron"
                  ></i>
                ) : (
                  <i
                    className="fas fa-chevron-down mr-3"
                    data-slot="select-base-chevron"
                  ></i>
                ))}
            </div>
            {props.append && <InputEnd side="append">{props.append}</InputEnd>}
          </div>
          <div
            data-slot="select-base-options-container"
            className={cn(
              `select-options-overflow absolute left-0 z-modal mt-1 h-0 overflow-y-hidden group-[.active]:top-full group-[.active]:h-auto group-[.active]:overflow-y-auto`,
              props.fitContent ? "w-fit" : "w-full"
            )}
          >
            <div
              className={cn(
                `relative flex flex-1 flex-col rounded-md border bg-white pb-2 shadow`,
                props.optionHeight ? props.optionHeight : "max-h-60"
              )}
            >
              {!props.noSearch && (
                <div className="sticky top-0 flex bg-white pb-1 pt-2">
                  <input
                    className={cn(
                      searchVariant({
                        input: props.input,
                      })
                    )}
                    type="text"
                    value={q}
                    placeholder="Search..."
                    onInput={search}
                    ref={inputRef}
                  />
                </div>
              )}
              <SelectOptions
                {...props}
                displayedOptions={displayedOptions}
                displayField={props.optionField}
                selected={props.selected ? [props.selected] : []}
                show={isActive}
                toggleOption={toggleOption}
                showNoOptions={q != ""}
                searching={searching}
                optionComponent={props.optionComponent}
              />
            </div>
          </div>
        </div>
        {props.helpText ? <HelpText>{props.helpText}</HelpText> : null}
        {hasErrors && !props.hideMessages && (
          <ErrorMessages errorMessages={props.errorMessages} />
        )}
      </div>
    );
  }
);
