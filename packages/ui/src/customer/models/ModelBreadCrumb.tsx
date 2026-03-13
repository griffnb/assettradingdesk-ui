import { cn } from "@/common_lib/utils/cn";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/shadcn/ui/breadcrumb";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
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

export interface ModelBreadCrumbProps
  extends VariantProps<typeof styleVariants> {
  model: ModelModel;
  className?: string;
}

export const ModelBreadCrumb = observer(function ModelBreadCrumb(
  fullProps: ModelBreadCrumbProps,
) {
  const { className, variant, model } = fullProps;

  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/assets">Assets</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/assets?category_id=${model.category_id}`}>
                {model.category_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/assets?manufacturer_id=${model.manufacturer_id}`}>
                {model.manufacturer_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-semibold">
              {model.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
});
