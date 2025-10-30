import { Button } from "@/ui/shadcn/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/ui/shadcn/ui/navigation-menu";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import { LayerService } from "@/common_lib/services/LayerService";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Store } from "@/models/store/Store";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { Bell, Menu } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CategoryFlyout } from "./CategoryFlyout";
import { ManufacturerFlyout } from "./ManufacturerFlyout";
import { MobileMenu, MobileMenuID } from "./MobileMenu";
import { SearchFlyout } from "./SearchFlyout";

export const NavBar = observer(function NavBar() {
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
        }
      });
    Store.manufacturer
      .query(
        { disabled: "0", order: "asset_count desc,name asc", limit: "20" },
        { customTTL: 1000 * 60 * 5 },
      )
      .then((resp) => {
        if (resp.success && resp.data) {
          setManufacturers(resp.data);
        }
      });
  }, []);

  const toggleSidebar = () => {
    LayerService.addOnly({ id: MobileMenuID, component: MobileMenu });
  };

  return (
    <div className="sticky flex w-full flex-1 flex-col items-center gap-3 border-b p-3 shadow-md md:flex-row md:px-6">
      <div className="flex w-full flex-row items-center justify-between gap-3 md:justify-normal">
        <Link to="/">
          <img src="/img/logo.png" className="h-10" />
        </Link>
        <Menu className="md:hidden" onClick={toggleSidebar} />
      </div>
      <SearchFlyout />
      <div className="hidden flex-row items-center gap-3 md:flex">
        <NavigationMenu
          viewport={false}
          delayDuration={1}
          skipDelayDuration={1}
        >
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
            <NavigationMenuItem value="browse">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/assets">Browse All Assets</Link>
              </NavigationMenuLink>
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
            <Link to="/signup">
              <Button className="bg-primary text-primary-foreground">
                Register Now
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-primary text-primary-foreground">
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
});
