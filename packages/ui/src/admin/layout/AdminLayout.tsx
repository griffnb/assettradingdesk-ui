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
import {
  LogOutIcon,
  SettingsIcon,
  SquareCheckIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { type ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import BookmarkModalActivator from "../bookmark/BookmarkModalActivator";
import type { LeftSidebarTab } from "../nav";
import {
  AdminBreadcrumbBar,
  AdminNavBar,
  AdminSubNav,
  LeftSidebar,
  NavBadge,
  NavLink,
  NavSearch,
  NavUserMenu,
} from "../nav";
import { SearchModalActivator } from "../search/SearchModalActivator";
import { MobileMenu } from "./MobileMenu";
import type { BadgeConfig, NavItemConfig } from "./sidebarItems";
import { sidebarItems, subNavItems } from "./sidebarItems";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  showLeftSidebar?: boolean;
}

/** Resolve badge configs into NavBadge elements, injecting dynamic counts */
function renderBadges(
  badges: BadgeConfig[],
  counts: Record<string, number>,
): ReactNode {
  return badges.map((badge, index) => {
    const resolvedCount = badge.countKey ? counts[badge.countKey] : badge.count;
    return (
      <NavBadge
        key={index}
        variant={badge.variant}
        size={badge.size}
        icon={badge.icon}
        count={resolvedCount}
      />
    );
  });
}

/** Render a single nav item as a NavLink with optional dropdown and badges */
function renderNavItem(
  item: NavItemConfig,
  location: { pathname: string },
  navigate: (path: string) => void,
  badgeCounts: Record<string, number>,
): ReactNode {
  const badges = item.badges
    ? renderBadges(item.badges, badgeCounts)
    : undefined;

  if (item.items) {
    return (
      <NavLink
        key={item.title}
        label={item.title}
        active={item.items.some((sub) => location.pathname === sub.url)}
        badges={badges}
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
      active={item.url ? location.pathname === item.url : false}
      onClick={() => item.url && navigate(item.url)}
      badges={badges}
    />
  );
}

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
        <p className="text-sm text-neutral-500">
          TODO: Qualifications panel content
        </p>
      </div>
    ),
  },
];

export const AdminLayout = observer(function InApp(props: AdminLayoutProps) {
  const { showLeftSidebar = true } = props;
  const { admin } = useAdmin({ checkOnly: true });
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

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

  // Dynamic badge counts — wire these to stores/API data as needed
  const badgeCounts: Record<string, number> = {
    tasksDanger: 133,
    tasksWarning: 133,
  };

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
            {sidebarItems.map((item) =>
              renderNavItem(item, location, navigate, badgeCounts),
            )}
          </AdminNavBar>

          <AdminSubNav>
            {subNavItems.map((item) =>
              renderNavItem(item, location, navigate, badgeCounts),
            )}
          </AdminSubNav>

          <AdminBreadcrumbBar />
        </div>

        {/* Body: Left Sidebar + Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {showLeftSidebar && (
            <LeftSidebar
              tabs={leftSidebarTabs}
              className="hidden shrink-0 md:flex"
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
