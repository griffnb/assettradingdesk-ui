import type { Meta, StoryObj } from "@storybook/react";
import TitleBar from "./TitleBar";

const meta = {
  component: TitleBar,
  title: "Common/Nav/TitleBar",
  argTypes: {
    title: { control: "text" },
    variant: {
      control: "select",
      options: ["light", "dark"],
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof TitleBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Default Title",
    variant: "light",
    className: "",
  },
};

export const AdminVariant: Story = {
  args: {
    title: "Admin Title",
    variant: "admin",
    className: "",
  },
};

export const CustomClass: Story = {
  args: {
    title: "Custom Class Title",
    variant: "light",
    className: "custom-class",
  },
};
