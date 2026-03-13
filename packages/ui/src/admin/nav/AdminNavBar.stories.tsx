import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/ui/shadcn/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertCircleIcon,
  Building2Icon,
  CircleDollarSignIcon,
  ContactIcon,
  DollarSignIcon,
  FileTextIcon,
  FlameIcon,
  LogOutIcon,
  SettingsIcon,
  SkullIcon,
  UserIcon,
} from "lucide-react";
import type { NavSearchItem } from "./NavSearch";
import { AdminBreadcrumbBar } from "./AdminBreadcrumbBar";
import { AdminNavBar } from "./AdminNavBar";
import { AdminSubNav } from "./AdminSubNav";
import { NavBadge } from "./NavBadge";
import { NavLink } from "./NavLink";
import { NavSearch } from "./NavSearch";
import { NavUserMenu } from "./NavUserMenu";

const meta = {
  component: AdminNavBar,
  title: "Admin/Nav/AdminNavBar",
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AdminNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const searchItems: NavSearchItem[] = [
  { label: "Acme Corporation", value: "acme-corp", group: "Accounts", icon: <Building2Icon className="size-4" /> },
  { label: "Globex Industries", value: "globex", group: "Accounts", icon: <Building2Icon className="size-4" /> },
  { label: "Stark Enterprises", value: "stark", group: "Accounts", icon: <Building2Icon className="size-4" /> },
  { label: "John Smith", value: "john-smith", group: "Contacts", icon: <ContactIcon className="size-4" /> },
  { label: "Jane Doe", value: "jane-doe", group: "Contacts", icon: <ContactIcon className="size-4" /> },
  { label: "Acme - Q4 Renewal", value: "acme-q4", group: "Opportunities", icon: <CircleDollarSignIcon className="size-4" /> },
  { label: "NDA - Acme Corp", value: "nda-acme", group: "Documents", icon: <FileTextIcon className="size-4" /> },
];

const userMenuContent = (
  <>
    <DropdownMenuLabel>Nick Griffin</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><UserIcon className="size-4" />Profile</DropdownMenuItem>
    <DropdownMenuItem><SettingsIcon className="size-4" />Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem><LogOutIcon className="size-4" />Sign Out</DropdownMenuItem>
  </>
);

const Logo = () => (
  <div className="flex items-center gap-1">
    <div className="size-12 rounded bg-white/10 flex items-center justify-center">
      <svg viewBox="0 0 48 48" className="size-10 text-white">
        <path
          d="M24 4L4 44h40L24 4zm0 8l14 28H10l14-28z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    </div>
    <span className="text-lg text-[hsl(var(--admin-nav-logo-text))]">
      <span className="font-semibold">A</span>
      <span className="font-medium">T</span>
      <span className="font-normal">D</span>
    </span>
  </div>
);

export const Default: Story = {
  args: {},
  render: () => (
    <AdminNavBar
      logo={<Logo />}
      trailing={
        <>
          <NavSearch className="flex-1" items={searchItems} />
          <NavUserMenu initials="NG">{userMenuContent}</NavUserMenu>
        </>
      }
    >
      <NavLink label="BDR Feed" />
      <NavLink label="Personal Feed" />
      <NavLink
        label="Tasks"
        dropdownContent={
          <>
            <DropdownMenuLabel>Tasks</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Tasks</DropdownMenuItem>
            <DropdownMenuItem>Overdue Tasks</DropdownMenuItem>
            <DropdownMenuItem>Completed Tasks</DropdownMenuItem>
          </>
        }
        badges={
          <>
            <NavBadge variant="danger" count={133} icon={SkullIcon} />
            <NavBadge variant="warning" count={133} icon={AlertCircleIcon} />
          </>
        }
      />
      <NavLink
        label="Campaigns"
        dropdownContent={
          <>
            <DropdownMenuItem>All Campaigns</DropdownMenuItem>
            <DropdownMenuItem>Active</DropdownMenuItem>
            <DropdownMenuItem>Drafts</DropdownMenuItem>
            <DropdownMenuItem>Archived</DropdownMenuItem>
          </>
        }
      />
      <NavLink
        label="My Campaign Queue"
        badges={<NavBadge variant="warning" count={0} icon={AlertCircleIcon} />}
      />
      <NavLink
        label="Campaign Reply Queue"
        badges={<NavBadge variant="success" count={0} icon={DollarSignIcon} />}
      />
      <NavLink
        label="Bionic Approval Queue"
        badges={<NavBadge variant="warning" size="icon" icon={AlertCircleIcon} />}
      />
      <NavLink
        label="Bionic Reply Queue"
        badges={<NavBadge variant="success" size="icon" icon={DollarSignIcon} />}
      />
    </AdminNavBar>
  ),
};

export const FullNavigation: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col">
      <AdminNavBar
        logo={<Logo />}
        trailing={
          <>
            <NavSearch className="flex-1" items={searchItems} />
            <NavUserMenu initials="NG">{userMenuContent}</NavUserMenu>
          </>
        }
      >
        <NavLink label="BDR Feed" />
        <NavLink label="Personal Feed" />
        <NavLink
          label="Tasks"
          dropdownContent={
            <>
              <DropdownMenuLabel>Tasks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Tasks</DropdownMenuItem>
              <DropdownMenuItem>Overdue Tasks</DropdownMenuItem>
              <DropdownMenuItem>Completed Tasks</DropdownMenuItem>
            </>
          }
          badges={
            <>
              <NavBadge variant="danger" count={133} icon={SkullIcon} />
              <NavBadge variant="warning" count={133} icon={AlertCircleIcon} />
            </>
          }
        />
        <NavLink
          label="Campaigns"
          dropdownContent={
            <>
              <DropdownMenuItem>All Campaigns</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Drafts</DropdownMenuItem>
              <DropdownMenuItem>Archived</DropdownMenuItem>
            </>
          }
        />
        <NavLink
          label="My Campaign Queue"
          badges={<NavBadge variant="warning" count={0} icon={AlertCircleIcon} />}
        />
        <NavLink
          label="Campaign Reply Queue"
          badges={<NavBadge variant="success" count={0} icon={DollarSignIcon} />}
        />
        <NavLink
          label="Bionic Approval Queue"
          badges={<NavBadge variant="warning" size="icon" icon={AlertCircleIcon} />}
        />
        <NavLink
          label="Bionic Reply Queue"
          badges={<NavBadge variant="success" size="icon" icon={DollarSignIcon} />}
        />
      </AdminNavBar>

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
              <DropdownMenuItem>Predictions</DropdownMenuItem>
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
              <DropdownMenuItem>Signatures</DropdownMenuItem>
            </>
          }
        />
        <NavLink
          label="Config"
          dropdownContent={
            <>
              <DropdownMenuItem>General</DropdownMenuItem>
              <DropdownMenuItem>Integrations</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
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

      <AdminBreadcrumbBar
        segments={[
          { label: "Home", href: "/" },
          { label: "Feed" },
        ]}
        actions={
          <NavBadge variant="neutral" size="default">
            <FlameIcon className="size-4" />
            <span className="text-xs font-medium capitalize">Hot Tool</span>
          </NavBadge>
        }
      />
    </div>
  ),
};

export const MinimalNav: Story = {
  args: {},
  render: () => (
    <AdminNavBar
      logo={<Logo />}
      trailing={<NavUserMenu initials="AB">{userMenuContent}</NavUserMenu>}
    >
      <NavLink label="Dashboard" active />
      <NavLink
        label="Reports"
        dropdownContent={
          <>
            <DropdownMenuItem>Weekly Report</DropdownMenuItem>
            <DropdownMenuItem>Monthly Report</DropdownMenuItem>
          </>
        }
      />
      <NavLink label="Settings" />
    </AdminNavBar>
  ),
};
