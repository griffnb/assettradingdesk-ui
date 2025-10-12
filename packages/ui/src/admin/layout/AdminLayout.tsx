"use client";
import { LayerDisplay } from "@/ui/common/components/layer/LayerDisplay";
import NotificationWrap from "@/ui/common/components/notification/NotificationWrap";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { ReactNode, useCallback, useState } from "react";
import BookmarkModalActivator from "../bookmark/BookmarkModalActivator";
import { SearchModalActivator } from "../search/SearchModalActivator";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileMenu } from "./MobileMenu";

interface SidebarItem {
  title: string;
  icon?: ReactNode;
  isActive?: boolean;
  url?: string;
  badge?: string;
  items?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    icon: <i className="fa fa-home" />,
    url: "/",
  },

  {
    title: "Pipelines",
    icon: <i className="fa fa-handshake" />,
    url: "/pipelines",
  },

  {
    title: "Companies",
    icon: <i className="fa fa-building" />,
    items: [
      {
        title: "Companies",
        url: "/companies",
      },
      {
        title: "Facilities",
        url: "/facilities",
      },

      {
        title: "Contacts",
        url: "/contacts",
      },
    ],
  },
  {
    title: "Assets",
    icon: <i className="fa fa-box-open" />,
    url: "/assets",
  },
  {
    title: "Requests",
    icon: <i className="fa fa-bell-concierge" />,
    url: "/requests",
  },
  {
    title: "Models",
    icon: <i className="fa fa-gears" />,
    items: [
      {
        title: "Categories",
        url: "/categories",
      },
      {
        title: "Manufacturers",
        url: "/manufacturers",
      },

      {
        title: "Models",
        url: "/models",
      },
    ],
  },

  {
    title: "Organizations",
    icon: <i className="fa fa-sitemap" />,
    items: [
      {
        title: "Organizations",
        url: "/organizations",
      },
      {
        title: "Accounts",
        url: "/accounts",
      },
    ],
  },
];

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AdminLayout = observer(function InApp(props: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpanded = useCallback((title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  return (
    <>
      <NotificationWrap />
      <LayerDisplay />
      <SearchModalActivator />
      <BookmarkModalActivator />
      <div className="relative min-h-screen overflow-hidden bg-background">
        <MobileMenu
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <DesktopSidebar
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div
          className={cn(
            "min-h-screen transition-all duration-300 ease-in-out",
            sidebarOpen ? "md:pl-64" : "md:pl-0"
          )}
        >
          <main className="flex-1">{props.children}</main>
        </div>
      </div>
    </>
  );
});
