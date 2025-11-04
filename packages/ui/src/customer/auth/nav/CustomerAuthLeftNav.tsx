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
import { BookOpen, Bot, PanelLeft, Plus, SquareTerminal } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomerAuthLeftNavProps {}

const platformItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Suggested Assets",
    url: "/opportunities",
    icon: Bot,
  },
  {
    title: "Manage Requests",
    url: "/requests",
    icon: BookOpen,
  },
  {
    title: "Offers",
    url: "/offers",
    icon: BookOpen,
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
            <SidebarMenuItem>
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

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/listings">
                  <SquareTerminal className="size-4" />
                  <span>Assets</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/listings">
                  <Plus className="size-4" />
                  Create New Asset
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
});
