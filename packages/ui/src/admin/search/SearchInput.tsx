import { cn } from "@/utils/cn";
import { debounce } from "@/utils/debounce";
import { detectOS } from "@/utils/os";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";

const styleVariants = cva("relative", {
  variants: {
    variant: {
      light: "bg-bg-neutral-primary",
      dark: "text-icon-neutral-quaternary",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

const inputVariant = cva(
  "pr-12 block  [focus-visible:outline-none focus-visible:ring-0 w-full rounded-lg pe-4 ps-10 text-sm disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        light:
          "bg-bg-neutral-secondary text-text-neutral-primary placeholder-text-neutral-primary border-border-neutral-tertiary",
        dark: "focus:text-white bg-text-neutral-secondary-hover placeholder-text-neutral-quinary-disabled border border-gray-modern-700",
      },
      size: {
        xs: "h-8",
        sm: "h-10",
        md: "h-12",
        lg: "h-14",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

const iconVariants = cva(
  " rounded-lg absolute pointer-events-none inset-y-0 start-0 z-20 flex items-center ps-3.5",
  {
    variants: {
      variant: {
        light: "text-decoration-none",
        dark: "text-icon-neutral-quaternary text-decoration-none",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

const commandVariants = cva(
  "pointer-events-none mx-1 my-1 rounded-md border px-1 text-sm bg-transparent",
  {
    variants: {
      variant: {
        light:
          "border-border-neutral-secondary text-text-neutral-quaternary bg-transparent",
        dark: "border-gray-modern-700 text-text-neutral-quinary-disabled",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

interface SearchInputProps
  extends VariantProps<typeof styleVariants>,
    VariantProps<typeof inputVariant> {
  searchQuery: string;
  applySearchQuery: (query: string) => void;
  prependIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  readOnly?: boolean;
}
export const SearchInput = observer((props: SearchInputProps) => {
  const [queryValue, setQueryValue] = useState(props.searchQuery);
  const [os, setOS] = useState<string>("");

  useEffect(() => {
    const os = detectOS();
    setOS(os);
  }, []);

  // Debounce the callback. The search will be triggered after 500ms of inactivity.
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      props.applySearchQuery(query);
    }, 500),
    []
  );

  return (
    <div
      className={cn(
        styleVariants({
          variant: props.variant,
          className: props.className,
        })
      )}
    >
      <label className="sr-only">Search input</label>
      <div className="relative m-4 flex flex-row rounded-lg">
        <div
          className={cn(
            iconVariants({
              variant: props.variant,
            })
          )}
        >
          {props.prependIcon}
        </div>
        <input
          className={cn(
            inputVariant({
              size: props.size,
              variant: props.variant,
              className: props.className,
            })
          )}
          type="text"
          placeholder="Search...."
          value={queryValue}
          autoFocus={true}
          onClick={props.onClick}
          onChange={(e) => {
            setQueryValue(e.target.value);
            debouncedSearch(e.target.value);
          }}
          readOnly={props.readOnly}
        />
        <div className="pointer-events-none absolute inset-y-0 end-2 z-20 flex items-center rounded-lg ps-3.5">
          <div className={cn(commandVariants({ variant: props.variant }))}>
            {os === "mac" ? "⌘/" : "Ctrl+/"}
          </div>
        </div>
      </div>
    </div>
  );
});
