import {
  NavigationMenu,
  NavigationMenuList,
} from "@/ui/shadcn/ui/navigation-menu";
import { cn } from "@/ui/shadcn/utils";
import type { ReactNode } from "react";

interface AdminNavBarProps {
  className?: string;
  logo?: ReactNode;
  children?: ReactNode;
  trailing?: ReactNode;
}

export function AdminNavBar(props: AdminNavBarProps) {
  const { className, logo, children, trailing } = props;

  return (
    <div
      data-slot="admin-nav-bar"
      className={cn([
        "flex items-center justify-between h-20 px-6",
        "bg-[hsl(var(--admin-nav-bg))]",
        "border-b border-[hsl(var(--admin-nav-border))]",
        className,
      ])}
    >
      <div className="flex items-center gap-6">
        {logo && (
          <div data-slot="admin-nav-logo" className="flex items-center gap-1">
            {logo}
          </div>
        )}
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-1">
            {children}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {trailing && (
        <div
          data-slot="admin-nav-trailing"
          className="flex items-center gap-4 max-w-80 flex-1 ml-4"
        >
          {trailing}
        </div>
      )}
    </div>
  );
}
