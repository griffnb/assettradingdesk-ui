"use client";
import { ChevronDown, Settings, Wand2 } from "lucide-react";

import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { Badge } from "../../ai/ui/badge";
import { ScrollArea } from "../../ai/ui/scroll-area";
import { sidebarItems } from "./InAppLayout";

interface DesktopSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  expandedItems: Record<string, boolean>;
  toggleExpanded: (title: string) => void;
}
export const DesktopSidebar = observer(function DesktopSidebar(
  props: DesktopSidebarProps
) {
  const { sidebarOpen, expandedItems, toggleExpanded } = props;
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
              <Wand2 className="size-5" />
            </div>
            <div>
              <h2 className="font-semibold">Techboss</h2>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.title} className="mb-1">
                <button
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium cursor-pointer",
                    item.isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-200"
                  )}
                  onClick={() => item.items && toggleExpanded(item.title)}
                >
                  <div className="flex items-center gap-3 cursor-pointer">
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
                        expandedItems[item.title] ? "rotate-180" : ""
                      )}
                    />
                  )}
                </button>

                {item.items && expandedItems[item.title] && (
                  <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.url}
                        className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-gray-200 cursor-pointer"
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
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t p-3">
          <div className="space-y-1">
            <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-gray-200">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-gray-200">
              <div className="flex items-center gap-3"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
