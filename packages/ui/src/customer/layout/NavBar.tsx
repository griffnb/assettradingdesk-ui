import { Button } from "@/ui/shadcn/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/ui/shadcn/ui/navigation-menu";

import { useAccount } from "@/common_lib/authentication/useAccount";
import { LayerService } from "@/common_lib/services/LayerService";
import { ServerService } from "@/common_lib/services/ServerService";
import { SessionService } from "@/common_lib/services/SessionService";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Store } from "@/models/store/Store";
import { useMeasureVariable } from "@/ui/hooks/useMeasureVariable";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { Menu } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CategoryFlyout } from "./CategoryFlyout";
import { ManufacturerFlyout } from "./ManufacturerFlyout";
import { MobileMenu, MobileMenuID } from "./MobileMenu";
import { SearchFlyout } from "./SearchFlyout";

export const NavBar = observer(function NavBar() {
  const { ref } = useMeasureVariable("customer-nav-bar", "height");
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerModel[]>([]);
  const { account } = useAccount();
  const nav = useNavigate();
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

  const logout = async () => {
    await ServerService.postRaw("/logout", {
      token: SessionService.sessionToken,
    });

    SessionService.clearSessionToken();
    SessionService.clearUser();
    nav("/");
  };

  return (
    <div
      className="flex w-full flex-1 flex-col items-center gap-3 border-b p-3 shadow-md md:flex-row md:px-6"
      ref={ref}
    >
      <div className="flex w-full flex-row items-center justify-between gap-3 md:w-fit md:justify-normal">
        <Link to="/" className="w-[170px] flex-none">
          <img src="/img/logo.png" className="w-[170px] flex-none" />
        </Link>
        <Menu className="md:hidden" onClick={toggleSidebar} />
      </div>
      <SearchFlyout />
      <div className="hidden flex-row items-center gap-3 md:flex md:w-full">
        <NavigationMenu
          viewport={false}
          delayDuration={1}
          skipDelayDuration={1}
          className="w-full max-w-full [&>*:last-child]:w-full"
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
            {account && (
              <NavigationMenuItem value="browse">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/manage/dashboard">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
          <NavigationMenuList className="ml-auto w-full justify-end">
            {account ? (
              <>
                <NavigationMenuItem value="manage-account" className="ml-auto">
                  <NavigationMenuTrigger>Manage Account</NavigationMenuTrigger>
                  <NavigationMenuContent className="left-auto right-0 z-10 flex !w-[400px] flex-col space-y-4 rounded-md border bg-white p-4 shadow-md">
                    <span className="text-sm">
                      Welcome, {account.first_name}!
                    </span>
                    <Link className="underline" to="/manage/dashboard">
                      My Account
                    </Link>
                    <Button
                      className="bg-primary text-primary-foreground"
                      onClick={logout}
                    >
                      Sign Out
                    </Button>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem value="signup">
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/signup">Signup Now</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem value="login">
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/login">Sign In</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
});
