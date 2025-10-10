import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, ReactNode, useState } from "react";

const styleVariants = cva(
  "justify-between items-center inline-flex w-full cursor-pointer py-2 mb-2",
  {
    variants: {
      variant: {
        default: "",
        admin:
          "mb-3 border border-gray-300 px-10 py-3 font-semibold text-text-neutral-secondary bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const labelVariants = cva("w-full ", {
  variants: {
    variant: {
      default: "text-sm font-semibold text-text-neutral-secondary",
      admin: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CollapsablePanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof styleVariants> {
  label?: ReactNode;
  defaultShow?: boolean;
  children: ReactNode;
  barComponent?: ReactNode;
}
export const CollapsablePanel = observer(function CollapsablePanel(
  fullProps: CollapsablePanelProps
) {
  const [show, setShow] = useState(fullProps.defaultShow);
  const { className, variant, ...props } = fullProps;

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div
      className={cn(`group flex w-full flex-col`)}
      data-show={show ? "true" : "false"}
    >
      <div
        className={cn(styleVariants({ variant, className }))}
        onClick={toggleShow}
      >
        {fullProps.barComponent ? (
          fullProps.barComponent
        ) : (
          <label className={cn(labelVariants({ variant, className }))}>
            {props.label}
          </label>
        )}

        <i
          className={`u u-chevron-down ml-auto inline-flex flex-col items-center justify-center text-xl transition-transform duration-200 ease-out group-data-[show=true]:-rotate-180`}
        ></i>
      </div>
      <div
        className={cn(
          "h-0 -translate-y-1 overflow-hidden pb-1 opacity-0 transition-all duration-100 ease-out",
          "group-data-[show=true]:h-auto group-data-[show=true]:translate-y-0 group-data-[show=true]:overflow-auto group-data-[show=true]:opacity-100"
        )}
      >
        {props.children}
      </div>
    </div>
  );
});
