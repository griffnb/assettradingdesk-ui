import type { LucideIcon } from "lucide-react";
import { AlertCircleIcon, CircleDollarSignIcon, SkullIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface BadgeConfig {
  variant: "danger" | "warning" | "success" | "neutral";
  icon?: LucideIcon;
  size?: "default" | "icon";
  /** Static count — ignored if countKey is set */
  count?: number;
  /** Key to look up a dynamic count from a runtime counts map */
  countKey?: string;
}

export interface NavItemConfig {
  title: string;
  icon?: ReactNode;
  url?: string;
  isActive?: boolean;
  badge?: string;
  items?: NavItemConfig[];
  badges?: BadgeConfig[];
}

// ── Primary nav items (top bar) ──────────────────────────────────────────────

export const sidebarItems: NavItemConfig[] = [
  {
    title: "Dashboard",
    icon: <i className="fa fa-handshake" />,
    url: "/pipelines",
  },
  {
    title: "Pipelines",
    icon: <i className="fa fa-handshake" />,
    url: "/pipelines",
    badges: [{ variant: "danger", countKey: "tasksDanger", icon: SkullIcon }],
  },

  {
    title: "Tasks",
    url: "/tasks",
    badges: [
      { variant: "danger", countKey: "tasksDanger", icon: SkullIcon },
      { variant: "warning", countKey: "tasksWarning", icon: AlertCircleIcon },
    ],
  },
  {
    title: "Email Campaigns",
    url: "/email-campaigns",
  },
  {
    title: "Approval Queue",
    url: "/approval-queue",
    badges: [{ variant: "warning", size: "icon", icon: AlertCircleIcon }],
  },
  {
    title: "Reply Queue",
    url: "/reply-queue",
    badges: [{ variant: "success", size: "icon", icon: CircleDollarSignIcon }],
  },
];

// ── Sub-nav items (second bar) ───────────────────────────────────────────────

export const subNavItems: NavItemConfig[] = [
  { title: "Dashboards", url: "/dashboards" },
  { title: "Reports", url: "/reports" },
  {
    title: "Trading",
    items: [
      { title: "Assets", url: "/assets" },
      { title: "Requests", url: "/requests" },
    ],
  },
  {
    title: "Companies",
    icon: <i className="fa fa-building" />,
    items: [
      { title: "Companies", url: "/companies" },
      { title: "Facilities", url: "/facilities" },
      { title: "Clients", url: "/clients" },
    ],
  },
  {
    title: "System",
    icon: <i className="fa fa-sitemap" />,
    items: [
      { title: "Billing Plans", url: "/billing_plans" },
      { title: "Categories", url: "/categories" },
      { title: "Manufacturers", url: "/manufacturers" },
      { title: "Models", url: "/models" },
      { title: "Validate Fields", url: "/validation" },
      { title: "Sync Objects", url: "/sync" },
      { title: "Organizations", url: "/organizations" },
      { title: "Accounts", url: "/accounts" },
      { title: "Test Accounts", url: "/accounts/testing" },
    ],
  },
];
