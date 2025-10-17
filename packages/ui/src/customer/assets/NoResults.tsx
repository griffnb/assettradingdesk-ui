import { Button } from "@/ui/shadcn/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/ui/shadcn/ui/empty";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

const styleVariants = cva("", {
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

export interface NoResultsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}
export const NoResults = observer(function NoResults(
  fullProps: NoResultsProps,
) {
  const { className, variant } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <Empty>
        <EmptyHeader className="max-w-md">
          <EmptyMedia variant="default">
            <Button variant={"outline"} className="size-10">
              <Search />
            </Button>
          </EmptyMedia>
          <EmptyTitle>No Results Found</EmptyTitle>
          <EmptyDescription>
            We didn&apos;t find any assets matching your criteria. Try adjusting
            filters, broadening your search terms, or view all our assets.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>View All Assets</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
});
