import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlameIcon } from "lucide-react";
import { AdminBreadcrumbBar } from "./AdminBreadcrumbBar";
import { NavBadge } from "./NavBadge";

const meta = {
  component: AdminBreadcrumbBar,
  title: "Admin/Nav/AdminBreadcrumbBar",
  argTypes: {
    segments: { control: "object" },
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AdminBreadcrumbBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    segments: [
      { label: "Home", href: "/" },
      { label: "Feed" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    segments: [
      { label: "Home", href: "/" },
      { label: "Feed" },
    ],
    actions: (
      <NavBadge variant="neutral" size="default">
        <FlameIcon className="size-4" />
        <span className="text-xs font-medium capitalize">Hot Tool</span>
      </NavBadge>
    ),
  },
};

export const DeepPath: Story = {
  args: {
    segments: [
      { label: "Home", href: "/" },
      { label: "Trading", href: "/trading" },
      { label: "Accounts", href: "/trading/accounts" },
      { label: "Account Details" },
    ],
  },
};
