import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/ui/shadcn/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertCircleIcon, DollarSignIcon, SkullIcon } from "lucide-react";
import { NavBadge } from "./NavBadge";
import { NavLink } from "./NavLink";

const meta = {
  component: NavLink,
  title: "Admin/Nav/NavLink",
  argTypes: {
    label: { control: "text" },
    active: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="bg-[hsl(200,17%,29%)] p-8 flex gap-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "BDR Feed",
  },
};

export const Active: Story = {
  args: {
    label: "BDR Feed",
    active: true,
  },
};

export const WithDropdown: Story = {
  args: {
    label: "Campaigns",
    dropdownContent: (
      <>
        <DropdownMenuLabel>Campaigns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>All Campaigns</DropdownMenuItem>
        <DropdownMenuItem>Active Campaigns</DropdownMenuItem>
        <DropdownMenuItem>Drafts</DropdownMenuItem>
        <DropdownMenuItem>Archived</DropdownMenuItem>
      </>
    ),
  },
};

export const WithBadges: Story = {
  args: {
    label: "Tasks",
    dropdownContent: (
      <>
        <DropdownMenuLabel>Tasks</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>My Tasks</DropdownMenuItem>
        <DropdownMenuItem>Overdue</DropdownMenuItem>
        <DropdownMenuItem>Completed</DropdownMenuItem>
      </>
    ),
    badges: (
      <>
        <NavBadge variant="danger" count={133} icon={SkullIcon} />
        <NavBadge variant="warning" count={133} icon={AlertCircleIcon} />
      </>
    ),
  },
};

export const WithSingleBadge: Story = {
  args: {
    label: "Campaign Reply Queue",
    badges: <NavBadge variant="success" count={0} icon={DollarSignIcon} />,
  },
};

export const WithIconBadge: Story = {
  args: {
    label: "Bionic Approval Queue",
    badges: <NavBadge variant="warning" size="icon" icon={AlertCircleIcon} />,
  },
};

export const AllVariations: Story = {
  args: { label: "" },
  render: () => (
    <div className="flex items-center gap-1 flex-wrap">
      <NavLink label="BDR Feed" />
      <NavLink label="Personal Feed" />
      <NavLink
        label="Tasks"
        dropdownContent={
          <>
            <DropdownMenuLabel>Tasks</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Tasks</DropdownMenuItem>
            <DropdownMenuItem>Overdue</DropdownMenuItem>
            <DropdownMenuItem>Completed</DropdownMenuItem>
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
    </div>
  ),
};
