import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./ToolTip";

const meta = {
  title: "Common/Tooltip",
  component: Tooltip,
  argTypes: {
    tooltip: { control: "text" },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    className: { control: "text" },
    event: {
      control: "select",
      options: ["hover", "click"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tooltip: "This is a tooltip",
    position: "top",
    event: "hover",
    children: <button>Hover me</button>,
  },
  render: (args) => {
    return (
      <div className="flex size-full min-h-svh flex-col items-center justify-center">
        <Tooltip {...args} />
      </div>
    );
  },
};

export const BottomPosition: Story = {
  args: {
    tooltip: "This is a tooltip",
    position: "bottom",
    event: "hover",
    children: <button>Hover me</button>,
  },
  render: (args) => {
    return (
      <div className="flex size-full min-h-svh flex-col items-center justify-center">
        <Tooltip {...args} />
      </div>
    );
  },
};

export const LeftPosition: Story = {
  args: {
    tooltip: "This is a tooltip",
    position: "left",
    event: "hover",
    children: <button>Hover me</button>,
  },
  render: (args) => {
    return (
      <div className="flex size-full min-h-svh flex-col items-center justify-center">
        <Tooltip {...args} />
      </div>
    );
  },
};

export const RightPosition: Story = {
  args: {
    tooltip: "This is a tooltip",
    position: "right",
    event: "hover",
    children: <button>Hover me</button>,
  },
  render: (args) => {
    return (
      <div className="flex size-full min-h-svh flex-col items-center justify-center">
        <Tooltip {...args} />
      </div>
    );
  },
};

export const ClickEvent: Story = {
  args: {
    tooltip: "This is a tooltip",
    position: "top",
    event: "click",
    children: <button>Click me</button>,
  },
  render: (args) => {
    return (
      <div className="flex size-full min-h-svh flex-col items-center justify-center">
        <Tooltip {...args} />
      </div>
    );
  },
};
