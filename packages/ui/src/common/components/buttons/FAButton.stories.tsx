import type { Meta, StoryObj } from "@storybook/react";
import { FAButton } from "./FAButton";

const meta = {
  title: "Common/FAButton",
  component: FAButton,
  argTypes: {
    fa: { control: "text" },
    customization: {
      control: "select",
      options: ["default", "custom"],
    },
    size: {
      control: "select",
      options: ["xs", "small", "medium"],
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof FAButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fa: "fa fa-home",
    customization: "default",
    size: "medium",
    className: "",
  },
};

export const SmallSize: Story = {
  args: {
    fa: "fa fa-home",
    customization: "default",
    size: "small",
    className: "",
  },
};

export const CustomStyle: Story = {
  args: {
    fa: "fa fa-home",
    customization: "custom",
    size: "medium",
    className: "custom-class",
  },
};
