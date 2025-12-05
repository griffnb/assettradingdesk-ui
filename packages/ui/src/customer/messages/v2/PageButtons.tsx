import { Button } from "@/ui/common/components/buttons/Button";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const styleVariants = cva("flex flex-row items-center gap-1", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

interface PageButtonsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  page: number;
  loading: boolean;
  setPage: (page: number) => void;
  total: number;
  pageSize: number;
}
export const PageButtons = (fullProps: PageButtonsProps) => {
  const { className, variant, ...props } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <Button
        variant={"tertiary"}
        size={"xs"}
        disabled={props.page <= 1 || props.loading}
        prependIcon={<i className="u u-arrow-left" />}
        onClick={() => props.setPage(Math.max(props.page - 1, 1))}
      ></Button>
      <div className="text-sm font-normal">Page {props.page}</div>
      <Button
        variant={"tertiary"}
        size={"xs"}
        disabled={props.total < props.pageSize || props.loading}
        prependIcon={<i className="u u-arrow-right" />}
        onClick={() => props.setPage(props.page + 1)}
      ></Button>
    </div>
  );
};
