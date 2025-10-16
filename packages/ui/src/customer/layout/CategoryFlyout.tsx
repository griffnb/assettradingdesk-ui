import { CategoryModel } from "@/models/models/category/model/CategoryModel";
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

export interface CategoryFlyoutProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  categories: CategoryModel[];
}
export const CategoryFlyout = observer(function CategoryFlyout(
  fullProps: CategoryFlyoutProps,
) {
  const { className, variant, categories } = fullProps;

  return (
    <div className="fixed left-0 top-[var(--customer-top-nav-h,0px)] z-nav-bar-over w-full">
      <div className={cn(styleVariants({ variant, className }))}>
        <div className="flex items-center justify-start gap-2 self-stretch rounded-md py-1.5 text-sm font-semibold leading-none text-foreground">
          <div className="justify-start">Shop by Categories</div>
        </div>
        <div
          className={`grid w-full grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2 overflow-y-auto lg:max-h-[400px]`}
        >
          {categories.map((category) => (
            <NavigationMenuLink asChild key={category.id}>
              <Link
                to={`/assets?categories=${category.id}`}
                key={category.id}
                className="text-sm font-normal leading-tight"
              >
                {category.name}
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
            <Link to="/assets">See All Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
});
