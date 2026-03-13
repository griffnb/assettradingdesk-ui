import { Button } from "@/ui/shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/shadcn/ui/tooltip";
import { cn } from "@/ui/shadcn/utils";
import { XIcon } from "lucide-react";
import { type ReactNode, useState } from "react";

export interface LeftSidebarTab {
  key: string;
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

interface LeftSidebarProps {
  className?: string;
  tabs: LeftSidebarTab[];
  defaultTab?: string;
  panelWidth?: number;
  onTabChange?: (key: string | null) => void;
}

export function LeftSidebar(props: LeftSidebarProps) {
  const { className, tabs, defaultTab, panelWidth = 320, onTabChange } = props;
  const [activeTab, setActiveTab] = useState<string | null>(
    defaultTab ?? null,
  );

  const currentTab = tabs.find((tab) => tab.key === activeTab);
  const isOpen = currentTab !== undefined;

  const handleTabClick = (key: string) => {
    const next = activeTab === key ? null : key;
    setActiveTab(next);
    onTabChange?.(next);
  };

  const handleClose = () => {
    setActiveTab(null);
    onTabChange?.(null);
  };

  return (
    <div
      data-slot="left-sidebar"
      data-open={isOpen || undefined}
      className={cn(["flex h-full", className])}
    >
      {/* Tab Strip */}
      <TooltipProvider>
        <div
          data-slot="left-sidebar-tabs"
          className={cn([
            "flex flex-col gap-2.5 p-2.5 w-14 shrink-0",
            "bg-[hsl(var(--admin-sidebar-tab-bg))]",
          ])}
        >
          {tabs.map((tab) => (
            <Tooltip key={tab.key}>
              <TooltipTrigger asChild>
                <button
                  data-slot="left-sidebar-tab"
                  data-active={activeTab === tab.key || undefined}
                  type="button"
                  onClick={() => handleTabClick(tab.key)}
                  className={cn([
                    "flex items-center justify-center size-9 rounded",
                    "bg-[hsl(var(--admin-sidebar-tab-btn))]",
                    "text-white/60 transition-colors",
                    "hover:text-white hover:bg-white/10",
                    "data-[active]:text-white data-[active]:bg-white/15",
                    "[&_svg]:size-4",
                  ])}
                >
                  {tab.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">{tab.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      {/* Content Panel - always rendered, animated via width */}
      <div
        data-slot="left-sidebar-panel"
        className="flex flex-col h-full shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out"
        style={{ width: isOpen ? panelWidth : 0 }}
      >
        <div className="flex flex-col h-full" style={{ minWidth: panelWidth }}>
          {/* Panel Header */}
          <div
            data-slot="left-sidebar-header"
            className={cn([
              "flex items-center justify-between h-13 pl-1 pr-3 py-4 shrink-0",
              "bg-[hsl(var(--admin-sidebar-header-bg))]",
            ])}
          >
            <div className="flex items-center">
              <span className="flex items-center justify-center size-9 text-white/60 [&_svg]:size-5">
                {currentTab?.icon}
              </span>
              <span className="text-sm font-medium text-white">
                {currentTab?.label}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleClose}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <XIcon className="size-3" />
            </Button>
          </div>

          {/* Panel Content */}
          <div
            data-slot="left-sidebar-content"
            className={cn([
              "flex-1 overflow-auto",
              "bg-[hsl(var(--admin-sidebar-panel-bg))]",
            ])}
          >
            {currentTab?.content}
          </div>
        </div>
      </div>
    </div>
  );
}
