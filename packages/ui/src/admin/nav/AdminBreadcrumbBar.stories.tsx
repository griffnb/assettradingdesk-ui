import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlameIcon } from "lucide-react";
import { AdminBreadcrumbBar } from "./AdminBreadcrumbBar";
import { BreadcrumbService } from "./BreadcrumbService";
import { NavBadge } from "./NavBadge";

const meta = {
  component: AdminBreadcrumbBar,
  title: "Admin/Nav/AdminBreadcrumbBar",
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
  play: () => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Feed" },
    ]);
  },
};

export const WithActions: Story = {
  args: {
    actions: (
      <NavBadge variant="neutral" size="default">
        <FlameIcon className="size-4" />
        <span className="text-xs font-medium capitalize">Hot Tool</span>
      </NavBadge>
    ),
  },
  play: () => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Feed" },
    ]);
  },
};

export const DeepPath: Story = {
  play: () => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Trading", href: "/trading" },
      { label: "Accounts", href: "/trading/accounts" },
      { label: "Account Details" },
    ]);
  },
};
