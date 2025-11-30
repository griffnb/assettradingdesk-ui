import { Button } from "@/ui/shadcn/ui/button";
import { Separator } from "@/ui/shadcn/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/ui/shadcn/ui/sidebar";
import {
  BookOpen,
  Bot,
  Building2,
  MessageSquare,
  PanelLeft,
  Plus,
  Settings,
  SquareTerminal,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomerAuthLeftNavProps {}

export const platformItems = [
  {
    title: "Dashboard",
    url: "/manage/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Messages",
    url: "/manage/messages",
    icon: MessageSquare,
  },
  {
    title: "Suggested Assets",
    url: "/manage/opportunities",
    icon: Bot,
  },
  {
    title: "Manage Requests",
    url: "/manage/requests",
    icon: BookOpen,
  },
  {
    title: "Offers",
    url: "/manage/offers",
    icon: BookOpen,
  },
];

export const assetItems = [
  {
    title: "Assets",
    url: "/manage/assets",
    icon: SquareTerminal,
  },
  {
    title: "New Asset",
    url: "/manage/assets/new",
    icon: Plus,
  },
];

export const managementItems = [
  {
    title: "Organization",
    url: "/manage/organization",
    icon: Settings,
  },
  {
    title: "Facilities",
    url: "/manage/facilities",
    icon: Building2,
  },
  {
    title: "My Account",
    url: "/manage/my-account",
    icon: Settings,
  },
];

export const CustomerAuthLeftNav = observer(function CustomerAuthLeftNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar
      className="top-[var(--customer-top-nav-h)] h-[calc(100dvh-var(--customer-top-nav-h))] border-r"
      variant="inset"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup className="!py-0 pb-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex flex-row items-center">
              <span className="group-data-[state='collapsed']:hidden">
                Manage
              </span>
              <SidebarMenuButton asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-7"
                  onClick={toggleSidebar}
                >
                  <PanelLeft className="size-4" />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="flex-1 p-2">
          <SidebarMenu>
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

          <SidebarMenu>
            <SidebarGroupLabel>Asset Management</SidebarGroupLabel>
            {assetItems.map((item) => (
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

          <SidebarMenu>
            <SidebarGroupLabel>Account Management</SidebarGroupLabel>
            {managementItems.map((item) => (
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
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
});
