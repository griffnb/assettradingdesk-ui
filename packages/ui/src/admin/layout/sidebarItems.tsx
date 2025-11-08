import { ReactNode } from "react";

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
      {
        title: "Test Accounts",
        url: "/accounts/testing",
      },
    ],
  },

  {
    title: "Sync",
    icon: <i className="fa fa-sitemap" />,
    items: [
      {
        title: "Sync Objects",
        url: "/sync",
      },
    ],
  },
];
