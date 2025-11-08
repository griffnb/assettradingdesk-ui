import type { Meta, StoryObj } from "@storybook/react-vite";
import { CSSToolTip } from "./CSSToolTip";

const meta = {
  title: "Common/Text/CSSToolTip",
  component: CSSToolTip,
  argTypes: {
    tooltip: { control: "text" },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof CSSToolTip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tooltip: "This is a tooltip",
    position: "top",
    children: (
      <button className="rounded bg-blue-500 px-4 py-2 text-white">
        Hover me
      </button>
    ),
  },
  render: (args) => (
    <div className="flex size-full min-h-[300px] flex-col items-center justify-center">
      <CSSToolTip {...args} />
    </div>
  ),
};

export const TopPosition: Story = {
  args: {
    tooltip: "Tooltip at the top",
    position: "top",
    children: (
      <button className="rounded bg-blue-500 px-4 py-2 text-white">
        Hover me
      </button>
    ),
  },
  render: (args) => (
    <div className="flex size-full min-h-[300px] flex-col items-center justify-center">
      <CSSToolTip {...args} />
    </div>
  ),
};

export const BottomPosition: Story = {
  args: {
    tooltip: "Tooltip at the bottom",
    position: "bottom",
    children: (
      <button className="rounded bg-blue-500 px-4 py-2 text-white">
        Hover me
      </button>
    ),
  },
  render: (args) => (
    <div className="flex size-full min-h-[300px] flex-col items-center justify-center">
      <CSSToolTip {...args} />
    </div>
  ),
};

export const LeftPosition: Story = {
  args: {
    tooltip: "Tooltip on the left",
    position: "left",
    children: (
      <button className="rounded bg-blue-500 px-4 py-2 text-white">
        Hover me
      </button>
    ),
  },
  render: (args) => (
    <div className="flex size-full min-h-[300px] flex-col items-center justify-center">
      <CSSToolTip {...args} />
    </div>
  ),
};

export const RightPosition: Story = {
  args: {
    tooltip: "Tooltip on the right",
    position: "right",
    children: (
      <button className="rounded bg-blue-500 px-4 py-2 text-white">
        Hover me
      </button>
    ),
  },
  render: (args) => (
    <div className="flex size-full min-h-[300px] flex-col items-center justify-center">
      <CSSToolTip {...args} />
    </div>
  ),
};

export const WithLongContent: Story = {
  args: {
    tooltip:
      "This is a tooltip with longer content that might wrap to multiple lines",
    position: "top",
    children: (
      <button className="rounded bg-blue-500 px-4 py-2 text-white">
        Hover for long tooltip
      </button>
    ),
  },
  render: (args) => (
    <div className="flex size-full min-h-[300px] flex-col items-center justify-center">
      <CSSToolTip {...args} />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    tooltip: "Custom styled tooltip",
    position: "top",
    className: "bg-red-500 text-white font-bold",
    children: (
      <button className="rounded bg-green-500 px-4 py-2 text-white">
        Custom tooltip
      </button>
    ),
  },
  render: (args) => (
    <div className="flex size-full min-h-[300px] flex-col items-center justify-center">
      <CSSToolTip {...args} />
    </div>
  ),
};
