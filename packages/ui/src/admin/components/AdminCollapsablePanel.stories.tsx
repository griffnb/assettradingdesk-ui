import type { Meta, StoryObj } from "@storybook/react";
import { AdminCollapsablePanel } from "./AdminCollapsablePanel";

const meta = {
  title: "Admin/Components/Panel/AdminCollapsablePanel",
  component: AdminCollapsablePanel,
  argTypes: {
    label: { control: "text" },
    defaultShow: { control: "boolean" },
    variant: {
      control: "select",
      options: ["default"], // Add more variants if available
    },
    className: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof AdminCollapsablePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Panel Label",
    defaultShow: false,
    variant: "default",
    className: "",
    children: "This is the content of the collapsable panel.",
  },
};

export const OpenByDefault: Story = {
  args: {
    label: "Panel Label",
    defaultShow: true,
    variant: "default",
    className: "",
    children: "This is the content of the collapsable panel.",
  },
};

export const CustomClass: Story = {
  args: {
    label: "Panel Label",
    defaultShow: false,
    variant: "default",
    className: "custom-class",
    children: "This is the content of the collapsable panel.",
  },
};
