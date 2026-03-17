import { DropdownMenuItem } from "@/ui/shadcn/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AdminSubNav } from "./AdminSubNav";
import { NavLink } from "./NavLink";

const meta = {
  component: AdminSubNav,
  title: "Admin/Nav/AdminSubNav",
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AdminSubNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <AdminSubNav>
      <NavLink
        label="Dashboards"
        dropdownContent={
          <>
            <DropdownMenuItem>Sales Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Marketing Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Pipeline Dashboard</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="Reports"
        dropdownContent={
          <>
            <DropdownMenuItem>Activity Reports</DropdownMenuItem>
            <DropdownMenuItem>Performance Reports</DropdownMenuItem>
            <DropdownMenuItem>Revenue Reports</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="Pipelines"
        dropdownContent={
          <>
            <DropdownMenuItem>Active Pipelines</DropdownMenuItem>
            <DropdownMenuItem>Pipeline Settings</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="Trading"
        dropdownContent={
          <>
            <DropdownMenuItem>Accounts</DropdownMenuItem>
            <DropdownMenuItem>Opportunities</DropdownMenuItem>
            <DropdownMenuItem>Orders</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="Model Management"
        dropdownContent={
          <>
            <DropdownMenuItem>Models</DropdownMenuItem>
            <DropdownMenuItem>Training</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="Lead Search"
        dropdownContent={
          <>
            <DropdownMenuItem>Search Leads</DropdownMenuItem>
            <DropdownMenuItem>Saved Searches</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="User Mgmt"
        dropdownContent={
          <>
            <DropdownMenuItem>Users</DropdownMenuItem>
            <DropdownMenuItem>Roles</DropdownMenuItem>
            <DropdownMenuItem>Permissions</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="Paperwork"
        dropdownContent={
          <>
            <DropdownMenuItem>Documents</DropdownMenuItem>
            <DropdownMenuItem>Templates</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="Config"
        dropdownContent={
          <>
            <DropdownMenuItem>General</DropdownMenuItem>
            <DropdownMenuItem>Integrations</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="System"
        dropdownContent={
          <>
            <DropdownMenuItem>Health</DropdownMenuItem>
            <DropdownMenuItem>Logs</DropdownMenuItem>
            <DropdownMenuItem>Jobs</DropdownMenuItem>
          </>
        }
      />
    </AdminSubNav>
  ),
};

export const FewItems: Story = {
  args: {},
  render: () => (
    <AdminSubNav>
      <NavLink label="Overview" active />
      <NavLink
        label="Analytics"
        dropdownContent={
          <>
            <DropdownMenuItem>Daily</DropdownMenuItem>
            <DropdownMenuItem>Weekly</DropdownMenuItem>
            <DropdownMenuItem>Monthly</DropdownMenuItem>
          </>
        }
      />
      <NavLink label="Settings" />
    </AdminSubNav>
  ),
};
