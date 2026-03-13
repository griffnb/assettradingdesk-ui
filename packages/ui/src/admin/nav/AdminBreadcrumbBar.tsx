import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/shadcn/ui/breadcrumb";
import { cn } from "@/ui/shadcn/utils";
import type { ReactNode } from "react";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface AdminBreadcrumbBarProps {
  className?: string;
  segments: BreadcrumbSegment[];
  actions?: ReactNode;
}

export function AdminBreadcrumbBar(props: AdminBreadcrumbBarProps) {
  const { className, segments, actions } = props;

  return (
    <div
      data-slot="admin-breadcrumb-bar"
      className={cn([
        "flex items-center justify-between h-11 px-4 pr-2.5 py-2",
        "bg-[hsl(var(--admin-breadcrumb-bg))]",
        "border-b-2 border-[hsl(var(--admin-breadcrumb-border))]",
        className,
      ])}
    >
      <Breadcrumb>
        <BreadcrumbList className="gap-1 text-xs flex-nowrap">
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
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
        </BreadcrumbList>
      </Breadcrumb>

      {actions && (
        <div data-slot="admin-breadcrumb-actions" className="flex items-center gap-2.5">
          {actions}
        </div>
      )}
    </div>
  );
}
