import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ClearMarker } from "../ClearMarker";
import { ErrorMarker } from "../ErrorMarker";
import { ErrorMessages } from "../ErrorMessages";

import { InputEnd } from "../InputEnd";
import { SelectOptions } from "./SelectOptions";

// Define item style variants for checked and unchecked states
const selectboxVariant = cva(
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

const inputVariant = cva(
  "relative flex w-full cursor-pointer flex-col items-center justify-center", // Common styles
  {
    variants: {
      variant: {
        default: [
          "rounded-md border bg-white h-9 shadow-sm border-gray-300",
          "group-[.active]:border-blue-dark-500 group-[.errors]:border-error-600",
        ],
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface MultiSelectBaseProps<T>
  extends VariantProps<typeof selectboxVariant>,
    VariantProps<typeof inputVariant> {
  placeholder?: string;
  closeOnSelect?: boolean;
  options: T[];
  errorMessages?: string[];
  handleChange: (values: T[]) => void;
  selected: T[] | undefined;
  idField: keyof T;
  optionField: keyof T;
  searchFunction: (
    q: string,
    setDisplayedOptions: (options: T[]) => void
  ) => Promise<void>;
  prepend?: ReactNode;
  append?: ReactNode;
  noSearch?: boolean;
  fitContent?: boolean;
  optionHeight?: string;
}
export const MultiSelectBase = observer(
  <T extends object>(props: MultiSelectBaseProps<T>) => {
    const [isActive, setIsActive] = useState(false);
    const [searching, setSearching] = useState(false);
    const [q, setQ] = useState("");
    const [displayedOptions, setDisplayedOptions] = useState<T[]>(
      props.options
    );

    const wrapperRef = useRef<HTMLDivElement>(null); // outer wrapper for clicking off
    const inputRef = useRef<HTMLInputElement>(null); // input for search

    const selectedIDs =
      props.selected?.map((item) => item[props.idField] as string | number) ||
      [];

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
      if (props.options && props.options.length > 0) {
        setDisplayedOptions(props.options);
      }
    }, [props.options]);

    const showDropdown = () => {
      if (isActive) return;

      setIsActive(true);
      inputRef.current?.focus();
    };

    const search = async (event: ChangeEvent<HTMLInputElement>) => {
      setQ(event.target.value);
      if (!searching) {
        setSearching(true);
      }
      await props.searchFunction(event.target.value, (options: T[]) => {
        setDisplayedOptions(options);
        setSearching(false);
      });
    };

    const toggleOption = (option: T) => {
      if (!selectedIDs.includes(option[props.idField] as string | number)) {
        const newSelected = [...(props.selected || []), option];
        props.handleChange(newSelected);
      } else {
        const newSelected = props.selected?.filter(
          (selectedOption) =>
            selectedOption[props.idField] !== option[props.idField]
        );

        props.handleChange(newSelected || []);
      }

      if (props.closeOnSelect) {
        setIsActive(false);
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

    const removeAll = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      props.handleChange([]);
    };

    const hasErrors = props.errorMessages && props.errorMessages?.length > 0;

    const hasSelectedItems = selectedIDs.length > 0;

    return (
      <div
        ref={wrapperRef}
        className={cn(selectboxVariant({ width: props.width }), {
          active: isActive,
          errors: hasErrors,
        })}
        onClick={showDropdown}
      >
        <div
          className={cn(
            inputVariant({
              variant: props.variant,
            })
          )}
        >
          <div className="flex size-full flex-row items-center">
            {props.prepend && (
              <InputEnd side="prepend">{props.prepend}</InputEnd>
            )}
            <div className="pl-2">
              {hasSelectedItems ? (
                <div className="flex flex-row flex-wrap gap-x-1 overflow-y-auto overflow-x-hidden">
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
            </div>
            <div className="ml-auto flex flex-row-reverse gap-x-2 text-right">
              {hasErrors ? (
                <ErrorMarker />
              ) : hasSelectedItems ? (
                <ClearMarker clearSelection={removeAll} variant="default" />
              ) : null}
              {isActive ? (
                <i className="fas fa-chevron-up mr-3"></i>
              ) : (
                <i className="fas fa-chevron-down mr-3"></i>
              )}
            </div>
            {props.append && <InputEnd side="append">{props.append}</InputEnd>}
          </div>
          <div
            className={cn(
              `select-options-overflow absolute left-0 z-modal mt-1 h-0 overflow-y-hidden group-[.active]:top-full group-[.active]:h-auto group-[.active]:overflow-y-auto`,
              props.fitContent ? "w-fit" : "w-full"
            )}
          >
            <div
              className={cn(
                `relative flex flex-1 flex-col rounded-md border bg-white pb-2`,
                props.optionHeight ? props.optionHeight : "max-h-60"
              )}
            >
              {!props.noSearch && (
                <div className="sticky top-0 flex bg-white pb-1 pt-2">
                  <input
                    className="mx-2 flex h-8 w-full grow flex-row items-center rounded border border-solid border-gray-300 px-2 py-1 text-xs shadow-none placeholder:text-gray-500 focus:border focus:border-blue-dark-500"
                    type="text"
                    value={q}
                    placeholder="Search..."
                    onInput={search}
                    ref={inputRef}
                  />
                </div>
              )}
              <SelectOptions
                displayedOptions={displayedOptions}
                idField={props.idField}
                displayField={props.optionField}
                selected={props.selected}
                show={isActive}
                toggleOption={toggleOption}
                showNoOptions={q != ""}
                searching={searching}
              />
            </div>
          </div>
        </div>

        {hasErrors && <ErrorMessages errorMessages={props.errorMessages} />}
      </div>
    );
  }
);
