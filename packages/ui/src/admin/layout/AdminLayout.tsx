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
import {
  AlertCircleIcon,
  CircleDollarSignIcon,
  LogOutIcon,
  SettingsIcon,
  SkullIcon,
  SquareCheckIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import BookmarkModalActivator from "../bookmark/BookmarkModalActivator";
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
  const { showLeftSidebar = true, breadcrumbs = [{ label: "Home" }] } = props;
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
            {/* Working links */}
            {sidebarItems
              .filter((item) => !item.items)
              .map((item) => (
                <NavLink
                  key={item.title}
                  label={item.title}
                  active={item.url ? location.pathname === item.url : false}
                  onClick={() => item.url && navigate(item.url)}
                />
              ))}
            {/* Working dropdown links */}
            {sidebarItems
              .filter((item) => item.items)
              .map((item) => (
                <NavLink
                  key={item.title}
                  label={item.title}
                  active={item.items?.some((sub) => location.pathname === sub.url)}
                  dropdownContent={
                    <>
                      {item.items?.map((sub) => (
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
              ))}
            {/* Figma nav items (placeholder) */}
            <NavLink label="BDR Feed" />
            <NavLink label="Personal Feed" />
            <NavLink
              label="Tasks"
              badges={
                <>
                  <NavBadge variant="danger" count={133} icon={SkullIcon} />
                  <NavBadge variant="warning" count={133} icon={AlertCircleIcon} />
                </>
              }
            />
            <NavLink label="Campaigns" />
            <NavLink
              label="My Campaign Queue"
              badges={<NavBadge variant="warning" count={0} icon={AlertCircleIcon} />}
            />
            <NavLink
              label="Campaign Reply Queue"
              badges={<NavBadge variant="success" count={0} icon={CircleDollarSignIcon} />}
            />
            <NavLink
              label="Bionic Approval Queue"
              badges={<NavBadge variant="warning" size="icon" icon={AlertCircleIcon} />}
            />
            <NavLink
              label="Bionic Reply Queue"
              badges={<NavBadge variant="success" size="icon" icon={CircleDollarSignIcon} />}
            />
          </AdminNavBar>

          <AdminSubNav>
            {/* Figma sub-nav items (placeholder) */}
            <NavLink label="Dashboards" />
            <NavLink label="Reports" />
            <NavLink label="Trading" />
            <NavLink label="Model Management" />
            <NavLink label="Lead Search" />
            <NavLink label="User Mgmt" />
            <NavLink label="Paperwork" />
            <NavLink label="Config" />
          </AdminSubNav>

          <AdminBreadcrumbBar segments={breadcrumbs} />
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
