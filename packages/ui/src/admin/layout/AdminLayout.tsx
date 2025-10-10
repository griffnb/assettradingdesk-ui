"use client";
import { LayerDisplay } from "@/ui/common/components/layer/LayerDisplay";
import NotificationWrap from "@/ui/common/components/notification/NotificationWrap";
import { cn } from "@/utils/cn";
import { FileText, Grid, Home, Layers } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
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
    icon: <Home />,
    isActive: true,
    url: "/",
  },
  {
    title: "Agents",
    icon: <Grid />,
    items: [
      { title: "All Agents", url: "/agents" },
      { title: "Business Planner", url: "#" },
      { title: "Marketing Planner", url: "#", badge: "2" },
    ],
  },
  {
    title: "Tools",
    icon: <Layers />,
    items: [
      { title: "AI Tools", url: "/ai_tools", badge: "4" },
      { title: "Categories", url: "/categories" },
      { title: "Tags", url: "/tags" },
    ],
  },
  {
    title: "Accounts",
    icon: <FileText />,
    url: "/accounts",
  },
];

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AdminLayout = observer(function InApp(props: AdminLayoutProps) {
  const [notifications] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

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
