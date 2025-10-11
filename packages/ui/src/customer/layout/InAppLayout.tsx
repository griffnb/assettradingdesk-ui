import { cn } from "@/utils/cn";
import { BookOpen, Bookmark, FileText, Grid, Home, Layers } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
import { NavBar } from "./NavBar";

export const sidebarItems = [
  {
    title: "Home",
    icon: <Home />,
    isActive: true,
  },
  {
    title: "Agents",
    icon: <Grid />,
    badge: "2",
    items: [
      { title: "All Agents", url: "#" },
      { title: "Business Planner", url: "#" },
      { title: "Marketing Planner", url: "#", badge: "2" },
    ],
  },
  {
    title: "Creatives",
    icon: <Layers />,
    badge: "4",
    items: [
      { title: "Active Projects", url: "#", badge: "4" },
      { title: "Archived", url: "#" },
      { title: "Templates", url: "#" },
    ],
  },
  {
    title: "Documents",
    icon: <FileText />,
    items: [
      { title: "Recent", url: "#" },
      { title: "Business Docs", url: "#", badge: "3" },
    ],
  },

  {
    title: "Learn",
    icon: <BookOpen />,
    items: [
      { title: "Tutorials", url: "#" },
      { title: "Courses", url: "#" },
      { title: "Webinars", url: "#" },
      { title: "Resources", url: "#" },
    ],
  },
  {
    title: "Resources",
    icon: <Bookmark />,
    items: [
      { title: "Stock Photos", url: "#" },
      { title: "AI Tools", url: "#" },
    ],
  },
];

interface InAppProps {
  children: ReactNode;
  title?: string;
}

export const InAppLayout = observer(function InApp(props: InAppProps) {
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
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:pl-64" : "md:pl-0"
        )}
      >
        <NavBar />
        <main className="flex-1">{props.children}</main>
      </div>
    </div>
  );
});
