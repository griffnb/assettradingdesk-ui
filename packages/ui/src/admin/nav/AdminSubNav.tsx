import {
  NavigationMenu,
  NavigationMenuList,
} from "@/ui/shadcn/ui/navigation-menu";
import { cn } from "@/ui/shadcn/utils";
import type { ReactNode } from "react";

interface AdminSubNavProps {
  className?: string;
  children?: ReactNode;
}

export function AdminSubNav(props: AdminSubNavProps) {
  const { className, children } = props;

  return (
    <div
      data-slot="admin-sub-nav"
      className={cn([
        "flex items-start px-6 py-2",
        "bg-[hsl(var(--admin-subnav-bg))]",
        className,
      ])}
    >
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-4">
          {children}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
