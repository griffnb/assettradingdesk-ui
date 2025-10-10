import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { HTMLAttributes, ReactNode, useState } from "react";

const styleVariants = cva(
  "justify-between items-center inline-flex w-full cursor-pointer py-2 mb-2",
  {
    variants: {
      variant: {
        default:
          "mb-3 border border-gray-300 px-10 py-3 font-semibold text-text-neutral-secondary bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
const labelVariants = cva("w-full ", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AdminCollapsablePanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof styleVariants> {
  label?: ReactNode;
  defaultShow?: boolean;
  children: ReactNode;
  barComponent?: ReactNode;
}
export const AdminCollapsablePanel = (
  fullProps: AdminCollapsablePanelProps,
) => {
  const [show, setShow] = useState(fullProps.defaultShow);
  const { className, variant, ...props } = fullProps;
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div
      className={cn(
        `group flex w-full flex-col ${show ? "show" : ""}`,
        show && "show",
      )}
    >
      <div
        className={cn(styleVariants({ variant, className }))}
        onClick={toggleShow}
      >
        {fullProps.barComponent ? (
          fullProps.barComponent
        ) : (
          <label className={cn(labelVariants({ variant }))}>
            {props.label}
          </label>
        )}

        <i
          className={clsx(
            `u u-chevron-down ml-auto inline-flex flex-col items-center justify-center text-xl transition-transform duration-200 ease-out`,
            { "-rotate-180": show },
          )}
        ></i>
      </div>
      {show && <div className={cn("pb-1")}>{props.children}</div>}
    </div>
  );
};
