import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/shadcn/ui/breadcrumb";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";

export interface ManufacturerBreadcrumbProps {
  manufacturer: ManufacturerModel;
  className?: string;
}

export const ManufacturerBreadcrumb = observer(function ManufacturerBreadcrumb({
  manufacturer,
  className,
}: ManufacturerBreadcrumbProps) {
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
              <Link to="/manufacturers">Manufacturers</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{manufacturer.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
});
