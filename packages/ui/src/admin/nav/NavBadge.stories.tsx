import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertCircleIcon, DollarSignIcon, FlameIcon, SkullIcon } from "lucide-react";
import { NavBadge } from "./NavBadge";

const meta = {
  component: NavBadge,
  title: "Admin/Nav/NavBadge",
  argTypes: {
    variant: {
      control: "select",
      options: ["danger", "warning", "success", "neutral"],
    },
    size: {
      control: "select",
      options: ["default", "icon"],
    },
    count: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div className="bg-[hsl(200,17%,29%)] p-8 flex gap-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {
  args: {
    variant: "danger",
    count: 133,
    icon: SkullIcon,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    count: 133,
    icon: AlertCircleIcon,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    count: 0,
    icon: DollarSignIcon,
  },
};

export const IconOnly: Story = {
  args: {
    variant: "warning",
    size: "icon",
    icon: AlertCircleIcon,
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    icon: FlameIcon,
  },
  render: (args) => (
    <NavBadge {...args}>
      <span className="text-xs font-medium capitalize">Hot Tool</span>
    </NavBadge>
  ),
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-3">
      <NavBadge variant="danger" count={133} icon={SkullIcon} />
      <NavBadge variant="warning" count={133} icon={AlertCircleIcon} />
      <NavBadge variant="success" count={0} icon={DollarSignIcon} />
      <NavBadge variant="warning" size="icon" icon={AlertCircleIcon} />
      <NavBadge variant="success" size="icon" icon={DollarSignIcon} />
    </div>
  ),
};
