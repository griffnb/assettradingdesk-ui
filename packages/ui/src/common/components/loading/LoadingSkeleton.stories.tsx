import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSkeleton } from "./LoadingSkeleton";

const meta: Meta<typeof LoadingSkeleton> = {
  title: "Common/LoadingSkeleton",
  component: LoadingSkeleton,
  argTypes: {
    variant: {
      control: "select",
      options: ["default"], // Add more variants if available
    },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    className: "",
  },
};

export const CustomClass: Story = {
  args: {
    variant: "default",
    className: "custom-class",
  },
};
