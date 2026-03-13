import { cn } from "@/common_lib/utils/cn";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/shadcn/ui/breadcrumb";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";

export interface CategoryBreadcrumbProps {
  category: CategoryModel;
  className?: string;
}

export const CategoryBreadcrumb = observer(function CategoryBreadcrumb({
  category,
  className,
}: CategoryBreadcrumbProps) {
  return (
    <div className={cn("flex w-full px-16 py-2", className)}>
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
              <Link to="/categories">Categories</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
});
