import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/shadcn/ui/breadcrumb";
import { cn } from "@/ui/shadcn/utils";
import { observer } from "mobx-react-lite";
import type { ReactNode } from "react";
import { BreadcrumbService } from "./BreadcrumbService";

interface AdminBreadcrumbBarProps {
  className?: string;
  actions?: ReactNode;
}

export const AdminBreadcrumbBar = observer(function AdminBreadcrumbBar(
  props: AdminBreadcrumbBarProps,
) {
  const { className, actions } = props;
  const segments = BreadcrumbService.segments;
  const { hash } = BreadcrumbService;
  const hasHash = !!hash;

  return (
    <div
      data-slot="admin-breadcrumb-bar"
      className={cn([
        "flex h-11 items-center justify-between px-4 py-2 pr-2.5",
        "bg-[hsl(var(--admin-breadcrumb-bg))]",
        "border-b-2 border-[hsl(var(--admin-breadcrumb-border))]",
        className,
      ])}
    >
      <Breadcrumb>
        <BreadcrumbList className="gap-1 flex-nowrap text-xs">
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1 && !hasHash;
            return (
              <BreadcrumbItem key={segment.label}>
                {index > 0 && (
                  <BreadcrumbSeparator className="text-[hsl(var(--admin-breadcrumb-link))] [&>svg]:hidden">
                    /
                  </BreadcrumbSeparator>
                )}
                {isLast ? (
                  <BreadcrumbPage className="text-[hsl(var(--admin-breadcrumb-text))]">
                    {segment.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={segment.href}
                    className="text-[hsl(var(--admin-breadcrumb-link))] hover:text-[hsl(var(--admin-breadcrumb-text))]"
                  >
                    {segment.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            );
          })}
          {hasHash && (
            <BreadcrumbItem>
              <BreadcrumbSeparator className="text-[hsl(var(--admin-breadcrumb-link))] [&>svg]:hidden">
                /
              </BreadcrumbSeparator>
              <BreadcrumbPage className="text-[hsl(var(--admin-breadcrumb-text))]">
                {hash}
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {actions && (
        <div
          data-slot="admin-breadcrumb-actions"
          className="flex items-center gap-2.5"
        >
          {actions}
        </div>
      )}
    </div>
  );
});
