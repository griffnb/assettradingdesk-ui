"use client";
import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { LayerDisplay } from "@/ui/common/components/layer/LayerDisplay";
import NotificationWrap from "@/ui/common/components/notification/NotificationWrap";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/ui/shadcn/ui/dropdown-menu";
import { cn } from "@/ui/shadcn/utils";
import { observer } from "mobx-react-lite";
import { LogOutIcon, SettingsIcon, SquareCheckIcon, UserIcon, ZapIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import BookmarkModalActivator from "../bookmark/BookmarkModalActivator";
import {
  AdminBreadcrumbBar,
  AdminNavBar,
  AdminSubNav,
  LeftSidebar,
  NavLink,
  NavSearch,
  NavUserMenu,
} from "../nav";
import type { LeftSidebarTab } from "../nav";
import { SearchModalActivator } from "../search/SearchModalActivator";
import { sidebarItems } from "./sidebarItems";
import { MobileMenu } from "./MobileMenu";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  showLeftSidebar?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
}

const Logo = () => (
  <div className="flex items-center gap-1">
    <img src="/img/logo_dark_mode.png" className="h-10" alt="Logo" />
    <span className="text-lg text-[hsl(var(--admin-nav-logo-text))]">
      <span className="font-semibold">A</span>
      <span className="font-medium">T</span>
      <span className="font-normal">D</span>
    </span>
  </div>
);

const leftSidebarTabs: LeftSidebarTab[] = [
  {
    key: "actions",
    label: "Actions",
    icon: <ZapIcon />,
    content: (
      <div className="p-4">
        <p className="text-sm text-neutral-500">TODO: Actions panel content</p>
      </div>
    ),
  },
  {
    key: "qualifications",
    label: "Qualifications",
    icon: <SquareCheckIcon />,
    content: (
      <div className="p-4">
        <p className="text-sm text-neutral-500">TODO: Qualifications panel content</p>
      </div>
    ),
  },
];

export const AdminLayout = observer(function InApp(props: AdminLayoutProps) {
  const { showLeftSidebar = true, breadcrumbs } = props;
  const { admin } = useAdmin({ checkOnly: true });
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const initials = admin?.name
    ? admin.name
        .split(" ")
        .map((part: string) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <>
      <NotificationWrap />
      <LayerDisplay />
      <SearchModalActivator />
      <BookmarkModalActivator />

      <div className="flex h-dvh flex-col overflow-hidden">
        {/* Mobile Menu */}
        <MobileMenu
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Top Nav */}
        <div className="shrink-0">
          <AdminNavBar
            logo={<Logo />}
            trailing={
              <>
                <NavSearch className="flex-1" placeholder="Search..." />
                <NavUserMenu initials={initials}>
                  <DropdownMenuLabel>{admin?.name ?? "User"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserIcon className="size-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <SettingsIcon className="size-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOutIcon className="size-4" />
                    Sign Out
                  </DropdownMenuItem>
                </NavUserMenu>
              </>
            }
          >
            {sidebarItems.map((item) => {
              const isActive = item.url
                ? location.pathname === item.url
                : item.items?.some((sub) => location.pathname === sub.url);

              if (item.items) {
                return (
                  <NavLink
                    key={item.title}
                    label={item.title}
                    active={isActive}
                    dropdownContent={
                      <>
                        {item.items.map((sub) => (
                          <DropdownMenuItem
                            key={sub.title}
                            onClick={() => sub.url && navigate(sub.url)}
                          >
                            {sub.title}
                          </DropdownMenuItem>
                        ))}
                      </>
                    }
                  />
                );
              }

              return (
                <NavLink
                  key={item.title}
                  label={item.title}
                  active={isActive}
                  onClick={() => item.url && navigate(item.url)}
                />
              );
            })}
          </AdminNavBar>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <AdminBreadcrumbBar segments={breadcrumbs} />
          )}
        </div>

        {/* Body: Left Sidebar + Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {showLeftSidebar && (
            <LeftSidebar
              tabs={leftSidebarTabs}
              className="hidden md:flex shrink-0"
            />
          )}

          <main
            className={cn([
              "relative flex flex-1 flex-col overflow-auto",
              "min-w-0",
            ])}
          >
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
});
