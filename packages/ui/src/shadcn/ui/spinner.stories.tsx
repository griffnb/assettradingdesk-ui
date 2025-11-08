import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Common/Components/UI/Spinner",
  component: Spinner,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the spinner",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    className: "size-8",
  },
  name: "Large Spinner",
};

export const Small: Story = {
  args: {
    className: "size-2",
  },
  name: "Small Spinner",
};

export const CustomColor: Story = {
  args: {
    className: "text-blue-500 size-6",
  },
  name: "Custom Color",
};

export const CustomStyles: Story = {
  args: {
    className: "size-10 text-green-600 opacity-50",
  },
  name: "Custom Styles",
};