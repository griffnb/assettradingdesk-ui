import { LayerService } from "@/common_lib/services/LayerService";
import { TakeoverPanelWrap } from "@/ui/common/components/takeover-panel/TakeoverPanelWrap";
import { Button } from "@/ui/shadcn/ui/button";
import {
  ViewSidebarGroup,
  ViewSidebarMenu,
  ViewSidebarMenuButton,
  ViewSidebarMenuItem,
} from "@/ui/shadcn/ui/sidebarview";
import { SignedIn, SignOutButton, useAuth } from "@clerk/clerk-react";
import { MessageSquare, X } from "lucide-react";
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
    title: "Browse Assets",
    url: "/assets",
    icon: null,
  },
];

const authenticatedItems = [
  {
    title: "Messages",
    url: "/messages",
    icon: <MessageSquare className="size-4" />,
  },
];

export const MobileMenuID = "mobile-menu";

export const MobileMenu = observer(function MobileMenu() {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const currentPath = location.pathname;

  const menu = !isSignedIn
    ? [
        ...sidebarItems,
        {
          title: "Signup",
          url: "/signup",
          icon: null,
        },
        {
          title: "Login",
          url: "/login",
          icon: null,
        },
      ]
    : [...sidebarItems, ...authenticatedItems];

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
          {menu.map((item) => (
            <ViewSidebarMenuItem key={item.title}>
              <ViewSidebarMenuButton
                asChild
                isActive={currentPath === item.url}
              >
                <Link
                  to={item.url}
                  key={item.url}
                  onClick={() => LayerService.remove(MobileMenuID)}
                >
                  {item.icon && item.icon}
                  <span>{item.title}</span>
                </Link>
              </ViewSidebarMenuButton>
            </ViewSidebarMenuItem>
          ))}
          <div className="flex w-full flex-col border-t py-3">
            <SignedIn>
              <SignOutButton>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => LayerService.remove(MobileMenuID)}
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </ViewSidebarMenu>
      </ViewSidebarGroup>
    </TakeoverPanelWrap>
  );
});
