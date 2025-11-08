import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Common/Components/UI/Progress",
  component: Progress,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value from 0 to 100",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const FullProgress: Story = {
  args: {
    value: 100,
  },
};

export const EmptyProgress: Story = {
  args: {
    value: 0,
  },
};

export const CustomWidth: Story = {
  args: {
    value: 75,
    className: "w-1/2",
  },
};

export const CustomHeight: Story = {
  args: {
    value: 60,
    className: "h-4 rounded-md",
  },
};