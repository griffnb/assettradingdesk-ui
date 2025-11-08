import type { Meta, StoryObj } from "@storybook/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar";
import { Home, Settings, Users, Folder, ChevronRight } from "lucide-react";

const meta: Meta<typeof Sidebar> = {
  title: "Common/Components/Navigation/Sidebar",
  component: Sidebar,
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Side of the screen for the sidebar",
    },
    variant: {
      control: "select",
      options: ["sidebar", "floating", "inset"],
      description: "Visual variant of the sidebar",
    },
    collapsible: {
      control: "select",
      options: ["offcanvas", "icon", "none"],
      description: "Collapsible behavior of the sidebar",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const MenuContent = () => (
  <>
    <SidebarHeader>
      <SidebarInput placeholder="Search" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <Home />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Users />
            <span>Users</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarGroup>
          <SidebarGroupLabel>Project Management</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Folder />
              <span>Projects</span>
            </SidebarMenuButton>
            <SidebarMenuAction>
              <ChevronRight />
            </SidebarMenuAction>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarMenu>
    </SidebarContent>
    <SidebarSeparator />
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>Profile</SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>Logout</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </>
);

export const Default: Story = {
  render: (args) => (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar {...args}>
          <MenuContent />
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
};

export const FloatingSidebar: Story = {
  ...Default,
  args: {
    side: "left",
    variant: "floating",
    collapsible: "icon",
  },
};

export const RightSidebar: Story = {
  ...Default,
  args: {
    side: "right",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
};

export const SkeletonLoading: Story = {
  render: (args) => (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar {...args}>
          <SidebarHeader>
            <SidebarInput placeholder="Search" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuSkeleton showIcon />
              <SidebarMenuSkeleton showIcon />
              <SidebarGroup>
                <SidebarGroupLabel>Project Management</SidebarGroupLabel>
                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton showIcon />
              </SidebarGroup>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
};

export const NonCollapsible: Story = {
  ...Default,
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "none",
  },
};