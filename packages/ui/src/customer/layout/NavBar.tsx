import { Button } from "@/ui/shadcn/ui/button";
import { Input } from "@/ui/shadcn/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/ui/shadcn/ui/navigation-menu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Store } from "@/models/store/Store";
import { Bell, Search } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CategoryFlyout } from "./CategoryFlyout";
import { ManufacturerFlyout } from "./ManufacturerFlyout";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export const NavBar = observer(function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerModel[]>([]);
  useEffect(() => {
    Store.category
      .query(
        { disabled: "0", "isnull:parent_category_id": "1" },
        { customTTL: 1000 * 60 * 5 },
      )
      .then((resp) => {
        if (resp.success && resp.data) {
          setCategories(resp.data);
          console.log("Categories");
        }
      });
    Store.manufacturer
      .query({ disabled: "0" }, { customTTL: 1000 * 60 * 5 })
      .then((resp) => {
        if (resp.success && resp.data) {
          setManufacturers(resp.data);
        }
      });
  }, []);

  return (
    <div className="flex w-full flex-1 flex-row items-center gap-3 border-b px-6 py-3">
      <Link to="/">
        <img src="/img/logo.png" />
      </Link>

      <div className="mx-6 flex w-full max-w-sm items-center rounded-lg border bg-white">
        <Search className="ml-3 size-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search equipment, manufacturers, models..."
          className="flex-1 border-0 bg-transparent text-lg placeholder:text-gray-700 focus-visible:ring-0"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem value="categories">
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent className="contents">
              <CategoryFlyout categories={categories} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="manufacturers">
            <NavigationMenuTrigger>Manufacturers</NavigationMenuTrigger>
            <NavigationMenuContent className="contents">
              <ManufacturerFlyout manufacturers={manufacturers} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex flex-row items-center gap-2">
        <SignedIn>
          <Button variant="outline" size="icon" aria-label="Submit">
            <Bell />
          </Button>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignUpButton>
            <Button>Register Now</Button>
          </SignUpButton>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
});
