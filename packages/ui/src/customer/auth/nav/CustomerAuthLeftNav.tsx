import { Button } from "@/ui/shadcn/ui/button";
import { Separator } from "@/ui/shadcn/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/shadcn/ui/sidebar3";
import {
  BookOpen,
  Bot,
  CircleHelp,
  Plus,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router";

export interface CustomerAuthLeftNavProps {}

const platformItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Suggested Tools",
    url: "/suggested-tools",
    icon: Bot,
  },
  {
    title: "Offers",
    url: "/offers",
    icon: BookOpen,
  },
];

const footerItems = [
  {
    title: "Support",
    url: "/support",
    icon: CircleHelp,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
  },
];

export const CustomerAuthLeftNav = observer(function CustomerAuthLeftNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Sidebar
      className="top-[var(--customer-top-nav-h)] h-[calc(100dvh-var(--customer-top-nav-h))] border-r"
      variant="inset"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup className="flex-1 p-2">
          <SidebarMenu>
            <SidebarGroupLabel className="px-2 opacity-70">
              Platform
            </SidebarGroupLabel>
            {platformItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={currentPath === item.url}>
                  <Link to={item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/listings">
                    <SquareTerminal className="size-4" />
                    <span>Listings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-xs"
            >
              <Plus className="size-4" />
              Create New Listing
            </Button>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="mb-2" />
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
});
