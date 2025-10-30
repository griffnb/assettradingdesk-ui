"use client";
import { ChevronDown } from "lucide-react";

import { cn } from "@/utils/cn";
import { UserButton } from "@clerk/clerk-react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router";
import { Badge } from "../../shadcn/ui/badge";
import { ScrollArea } from "../../shadcn/ui/scroll-area";
import { sidebarItems } from "./sidebarItems";

interface DesktopSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  expandedItems: Record<string, boolean>;
  toggleExpanded: (title: string) => void;
}
export const DesktopSidebar = observer(function DesktopSidebar(
  props: DesktopSidebarProps,
) {
  const { sidebarOpen, expandedItems, toggleExpanded } = props;
  const location = useLocation();
  const navigate = useNavigate();
  console.log({ location });
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" />
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.title} className="mb-1">
                <button
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                    item.url && location.pathname == item.url
                      ? "bg-bg-brand-primary/10 text-text-brand-primary"
                      : "hover:bg-gray-200",
                  )}
                  onClick={() => {
                    if (item.url) {
                      navigate(item.url);
                    } else if (item.items) {
                      toggleExpanded(item.title);
                    }
                  }}
                >
                  <div className="flex cursor-pointer items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className="ml-auto rounded-full px-2 py-0.5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {item.items && (
                    <ChevronDown
                      className={cn(
                        "ml-2 h-4 w-4 transition-transform",
                        expandedItems[item.title] ? "rotate-180" : "",
                      )}
                    />
                  )}
                </button>

                {item.items && expandedItems[item.title] && (
                  <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                    {item.items.map((subItem) => (
                      <span
                        key={subItem.title}
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-gray-200",
                          item.url && location.pathname == item.url
                            ? "bg-bg-brand-primary/10 text-text-brand-primary"
                            : "hover:bg-gray-200",
                        )}
                        onClick={() => {
                          if (subItem.url) {
                            navigate(subItem.url);
                          }
                        }}
                      >
                        {subItem.title}
                        {subItem.badge && (
                          <Badge
                            variant="outline"
                            className="ml-auto rounded-full px-2 py-0.5 text-xs"
                          >
                            {subItem.badge}
                          </Badge>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t p-3">
          <div className="space-y-1">
            <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-gray-200">
              <div className="flex items-center gap-3">
                <UserButton showName={true} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
