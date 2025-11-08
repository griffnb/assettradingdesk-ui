import type { Meta, StoryObj } from "@storybook/react";
import { UserIcon, SettingsIcon, HomeIcon, DollarSignIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Common/Components/Navigation/NavigationMenu",
  component: NavigationMenu,
  argTypes: {
    viewport: {
      control: "boolean",
      description: "Toggle viewport display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <HomeIcon className="mr-2 size-4" /> Home
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4">
              <NavigationMenuLink href="#home">
                <div className="flex items-center">
                  <HomeIcon className="mr-2 size-4" />
                  Dashboard
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <DollarSignIcon className="mr-2 size-4" /> Assets
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 space-y-2">
              <NavigationMenuLink href="#assets">
                <div className="flex items-center">
                  Asset List
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#create-asset">
                <div className="flex items-center">
                  Create Asset
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <UserIcon className="mr-2 size-4" /> Profile
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 space-y-2">
              <NavigationMenuLink href="#profile">
                <div className="flex items-center">
                  View Profile
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#settings">
                <div className="flex items-center">
                  <SettingsIcon className="mr-2 size-4" />
                  Account Settings
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithoutViewport: Story = {
  args: {
    viewport: false,
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu Item 1</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4">Content for Menu Item 1</div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu Item 2</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4">Content for Menu Item 2</div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const LightAndDarkMode: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="p-4 bg-white dark:bg-neutral-950">
        <h3 className="mb-2 text-sm font-semibold">Light Mode</h3>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Light Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4">Light Mode Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="p-4 bg-neutral-950 text-neutral-50">
        <h3 className="mb-2 text-sm font-semibold text-neutral-50">Dark Mode</h3>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Dark Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4">Dark Mode Content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  ),
};