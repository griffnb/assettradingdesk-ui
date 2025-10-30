import { LayerService } from "@/common_lib/services/LayerService";
import { TakeoverPanelWrap } from "@/ui/common/components/takeover-panel/TakeoverPanelWrap";
import { Button } from "@/ui/shadcn/ui/button";
import {
  ViewSidebarGroup,
  ViewSidebarMenu,
  ViewSidebarMenuButton,
  ViewSidebarMenuItem,
} from "@/ui/shadcn/ui/sidebarview";
import { X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MobileMenuProps {}

const sidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: null,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: null,
  },
  {
    title: "Manufacturers",
    url: "/manufacturers",
    icon: null,
  },
  {
    title: "Models",
    url: "/models",
    icon: null,
  },
  {
    title: "Assets",
    url: "/assets",
    icon: null,
  },
];

export const MobileMenuID = "mobile-menu";

export const MobileMenu = observer(function MobileMenu() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <TakeoverPanelWrap
      id={MobileMenuID}
      title="Menu"
      size={"full"}
      hideBack={true}
    >
      <div className="flex flex-row items-center justify-between group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:justify-center">
        <div className="flex flex-col items-center group-data-[state=collapsed]:hidden">
          <img src="/img/logo.png" className="h-10" alt="Logo" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto size-7 cursor-pointer group-data-[state=collapsed]:ml-0"
          onClick={() => LayerService.remove(MobileMenuID)}
        >
          <X className="size-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <ViewSidebarGroup className="flex-1 p-2">
        <ViewSidebarMenu>
          {sidebarItems.map((item) => (
            <ViewSidebarMenuItem key={item.title}>
              <ViewSidebarMenuButton
                asChild
                isActive={currentPath === item.url}
              >
                <Link to={item.url} key={item.url}>
                  {item.icon && item.icon}
                  <span>{item.title}</span>
                </Link>
              </ViewSidebarMenuButton>
            </ViewSidebarMenuItem>
          ))}
        </ViewSidebarMenu>
      </ViewSidebarGroup>
    </TakeoverPanelWrap>
  );
});
