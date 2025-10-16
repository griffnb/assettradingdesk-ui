import { AssetModel } from "@/models/models/asset/model/AssetModel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/shadcn/ui/breadcrumb";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react";
import { Link } from "react-router";

const styleVariants = cva("flex flex-row w-full px-16 py-2", {
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

export interface AssetBreadCrumbProps
  extends VariantProps<typeof styleVariants> {
  asset: AssetModel;
  className?: string;
}
export const AssetBreadCrumb = observer(function AssetBreadCrumb(
  fullProps: AssetBreadCrumbProps,
) {
  const { className, variant, asset } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/assets">Assets</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/assets?category_id=${asset.category_id}`}>
                {asset.category_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/assets?manufacturer_id=${asset.manufacturer_id}`}>
                {asset.manufacturer_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/assets?model_id=${asset.model_id}`}>
                {asset.model_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
});
