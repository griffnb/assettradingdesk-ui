import type { Meta, StoryObj } from "@storybook/react";
import {
  ViewSidebar,
  ViewSidebarContent,
  ViewSidebarGroup,
  ViewSidebarMenu,
  ViewSidebarMenuItem,
  ViewSidebarMenuButton,
  ViewSidebarMenuSubButton,
  ViewSidebarHeader,
  ViewSidebarSeparator,
  ViewSidebarInset,
} from "./sidebarview";
import { HomeIcon, SettingsIcon, UserIcon, UsersIcon } from "lucide-react";
import { Store } from "@/models/store/Store";

const meta: Meta<typeof ViewSidebar> = {
  title: "Common/Components/UI/SidebarView",
  component: ViewSidebar,
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the sidebar",
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
    open: {
      control: "boolean",
      description: "Whether the sidebar is open or closed",
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarContent = () => (
  <>
    <ViewSidebarHeader>
      <h2 className="text-sm font-semibold">Asset Trading Desk</h2>
    </ViewSidebarHeader>
    <ViewSidebarSeparator />
    <ViewSidebarContent>
      <ViewSidebarMenu>
        <ViewSidebarMenuItem>
          <ViewSidebarMenuButton isActive tooltip="Dashboard">
            <HomeIcon />
            <span>Dashboard</span>
          </ViewSidebarMenuButton>
        </ViewSidebarMenuItem>
        <ViewSidebarMenuItem>
          <ViewSidebarMenuButton tooltip="Users">
            <UsersIcon />
            <span>Users</span>
          </ViewSidebarMenuButton>
        </ViewSidebarMenuItem>
        <ViewSidebarMenuItem>
          <ViewSidebarMenuButton tooltip="Profile">
            <UserIcon />
            <span>Profile</span>
          </ViewSidebarMenuButton>
        </ViewSidebarMenuItem>
        <ViewSidebarMenuItem>
          <ViewSidebarMenuButton tooltip="Settings">
            <SettingsIcon />
            <span>Settings</span>
          </ViewSidebarMenuButton>
        </ViewSidebarMenuItem>
      </ViewSidebarMenu>
    </ViewSidebarContent>
  </>
);

export const Default: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "none",
    open: true,
  },
  render: (args) => (
    <div className="flex h-[600px]">
      <ViewSidebar {...args}>
        <SidebarContent />
      </ViewSidebar>
      <ViewSidebarInset>
        <div className="p-4">Main Content</div>
      </ViewSidebarInset>
    </div>
  ),
};

export const Collapsible: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
    open: true,
  },
  render: (args) => (
    <div className="flex h-[600px]">
      <ViewSidebar {...args}>
        <SidebarContent />
      </ViewSidebar>
      <ViewSidebarInset>
        <div className="p-4">Main Content</div>
      </ViewSidebarInset>
    </div>
  ),
};

export const FloatingSidebar: Story = {
  args: {
    side: "left",
    variant: "floating",
    collapsible: "icon",
    open: true,
  },
  render: (args) => (
    <div className="flex h-[600px]">
      <ViewSidebar {...args}>
        <SidebarContent />
      </ViewSidebar>
      <ViewSidebarInset>
        <div className="p-4">Main Content with Floating Sidebar</div>
      </ViewSidebarInset>
    </div>
  ),
};

export const CollapsedSidebar: Story = {
  args: {
    side: "right",
    variant: "sidebar",
    collapsible: "offcanvas",
    open: false,
  },
  render: (args) => (
    <div className="flex h-[600px]">
      <ViewSidebar {...args}>
        <SidebarContent />
      </ViewSidebar>
      <ViewSidebarInset>
        <div className="p-4">Main Content (Sidebar Collapsed)</div>
      </ViewSidebarInset>
    </div>
  ),
};

export const InsetVariant: Story = {
  args: {
    side: "left",
    variant: "inset",
    collapsible: "icon",
    open: true,
  },
  render: (args) => (
    <div className="flex h-[600px]">
      <ViewSidebar {...args}>
        <SidebarContent />
      </ViewSidebar>
      <ViewSidebarInset>
        <div className="p-4">Main Content with Inset Sidebar</div>
      </ViewSidebarInset>
    </div>
  ),
};