import { BookOpen, Bookmark, FileText, Grid, Home, Layers } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { Footer } from "./Footer";
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

interface InAppLayoutProps {
  children: ReactNode;
  title?: string;
  noFooter?: boolean;
}

export const InAppLayout = observer(function InAppLayout(
  props: InAppLayoutProps,
) {
  return (
    <div className="relative flex flex-1 flex-col bg-background">
      <NavBar />
      <main className="flex h-full flex-col">
        {props.children}
        {!props.noFooter && <Footer />}
      </main>
    </div>
  );
});
