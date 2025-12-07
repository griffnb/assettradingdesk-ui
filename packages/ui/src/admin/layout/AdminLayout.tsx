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

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AdminLayout = observer(function InApp(props: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
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
      <div className="flex h-dvh flex-col overflow-hidden">
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
            "flex h-full overflow-x-hidden",
            sidebarOpen ? "md:pl-64" : "md:pl-0",
          )}
        >
          <main className="relative flex h-full flex-1 flex-col overflow-auto">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
});
