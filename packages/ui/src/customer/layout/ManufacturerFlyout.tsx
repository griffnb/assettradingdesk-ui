import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Button } from "@/ui/shadcn/ui/button";
import { NavigationMenuLink } from "@/ui/shadcn/ui/navigation-menu";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";
import { Link } from "react-router";

const styleVariants = cva(
  "p-4 flex-1 bg-background shadow-lg border-b-2 border flex flex-col w-[98%] mx-auto rounded-lg gap-2",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface ManufacturerFlyoutProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  manufacturers: ManufacturerModel[];
}
export const ManufacturerFlyout = observer(function ManufacturerFlyout(
  fullProps: ManufacturerFlyoutProps,
) {
  const { className, variant, manufacturers } = fullProps;

  return (
    <div className="fixed left-0 top-[var(--customer-top-nav-h,20px)] z-nav-bar-over w-full">
      <div className={cn(styleVariants({ variant, className }))}>
        <div className="flex items-center justify-start gap-2 self-stretch rounded-md py-1.5 text-sm font-semibold leading-none text-foreground">
          <div className="justify-start">Shop by Top Manufacturers</div>
        </div>
        <div
          className={`grid w-full grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2 overflow-y-auto lg:max-h-[400px]`}
        >
          {manufacturers.map((manufacturer) => (
            <NavigationMenuLink asChild key={manufacturer.id}>
              <Link
                to={`/assets?manufacturers=${manufacturer.id}`}
                key={manufacturer.id}
                className="truncate text-sm font-normal leading-tight"
              >
                {manufacturer.name}
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
        <div className="flex w-full flex-col items-start">
          <Button
            variant="link"
            className="ml-0 pl-2 text-sm font-medium text-primary"
            asChild
          >
            <Link to="/assets">See All Manufacturers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
});
