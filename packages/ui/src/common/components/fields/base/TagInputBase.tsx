import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ClearMarker } from "./ClearMarker";
import { ErrorMarker } from "./ErrorMarker";
import { ErrorMessages } from "./ErrorMessages";
import { InputEnd } from "./InputEnd";

export type Tag = string | number;

const selectboxVariant = cva("relative flex flex-col group", {
  variants: {
    width: {
      default: "min-w-[142px]",
      custom: "",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

const inputVariant = cva(
  "relative flex w-full cursor-pointer flex-col items-center justify-center",
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

export interface TagInputProps
  extends VariantProps<typeof selectboxVariant>,
    VariantProps<typeof inputVariant> {
  placeholder?: string;
  errorMessages?: string[];
  handleChange: (values: Tag[]) => void;
  tags: Tag[];
  prepend?: ReactNode;
  append?: ReactNode;
  onBlur?: () => void;
  hintText?: string;
}

export const TagInputBase = observer((props: TagInputProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTag, setNewTag] = useState<Tag>("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hasErrors = props.errorMessages && props.errorMessages?.length > 0;
  const hasTags = props.tags.length > 0;

  const removeTag = (tag: Tag) => () => {
    const newTags = props.tags.filter((existingTag) => existingTag !== tag);
    props.handleChange(newTags);
  };

  const removeAll = () => {
    props.handleChange([]);
  };

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (newTag && props.tags.indexOf(newTag) === -1) {
        props.handleChange([...props.tags, newTag]);
        setNewTag("");
      }
    }
  };

  const showInput = () => {
    setIsActive(true);
  };

  const handleWrapperBlur = () => {
    setIsActive(false);
    if (props.onBlur) {
      props.onBlur();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(selectboxVariant({ width: props.width }), {
        active: isActive,
        errors: hasErrors,
      })}
      onClick={showInput}
    >
      <div
        className={cn(
          inputVariant({
            variant: props.variant,
          })
        )}
      >
        <div className="flex size-full flex-row items-center">
          {props.prepend && <InputEnd side="prepend">{props.prepend}</InputEnd>}
          <div className="pl-2">
            {hasTags ? (
              <div className="flex flex-row gap-x-1 overflow-y-auto overflow-x-hidden">
                {props.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex cursor-default flex-row items-center justify-center gap-x-1 text-wrap rounded-md border border-gray-300 bg-gray-100 py-1 pl-2 pr-1 text-sm"
                  >
                    <span className="text-nowrap leading-3">{tag}</span>
                    <div
                      className="mr-1 flex size-3 cursor-pointer items-center justify-center text-base"
                      onClick={removeTag(tag)}
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
            ) : hasTags ? (
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
          className={`select-options-overflow absolute z-modal mr-3 mt-1 w-full rounded-md shadow-lg ${isActive ? "top-full h-auto overflow-y-auto bg-white" : "h-0 overflow-y-hidden"}`}
        >
          <div className="relative top-0 flex max-h-40 flex-col overflow-y-auto bg-white px-1 pb-2">
            <div className="sticky top-0 flex bg-white pb-1 pt-2">
              <div className="relative flex flex-1">
                <input
                  onBlur={handleWrapperBlur}
                  className="mx-2 flex h-8 w-full grow flex-row items-center rounded border border-solid border-gray-300 px-2 py-1 text-xs shadow-none placeholder:text-gray-500 focus:border focus:border-blue-dark-500"
                  type="text"
                  value={newTag}
                  placeholder="Add..."
                  onKeyDown={addTag}
                  onChange={(e) => setNewTag(e.currentTarget.value)}
                  ref={inputRef}
                />
                <span className="pointer-events-none absolute right-4 top-1 text-gray-400">
                  {props.hintText || "⏎ to add"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasErrors && <ErrorMessages errorMessages={props.errorMessages} />}
    </div>
  );
});
