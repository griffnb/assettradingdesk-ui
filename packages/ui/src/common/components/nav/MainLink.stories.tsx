import type { Meta, StoryObj } from "@storybook/react";
import { MainLink } from "./MainLink";

const meta = {
  component: MainLink,
  title: "Common/Nav/MainLink",
  argTypes: {
    icon: { control: "text" },
    route: { control: "text" },
    label: { control: "text" },
    className: { control: "text" },
    variant: { control: { type: "select", options: ["light", "dark"] } },
    active: { control: "boolean" },
    notifications: { control: "number" },
  },
} satisfies Meta<typeof MainLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "fas fa-home",
    route: "/home",
    label: "Home",
    className: "",
    variant: "light",
  },
};

export const DarkVariant: Story = {
  args: {
    icon: "fas fa-cog",
    route: "/settings",
    label: "Settings",
    className: "",
    variant: "dark",
  },
};

export const CustomClass: Story = {
  args: {
    icon: "fas fa-user",
    route: "/profile",
    label: "Profile",
    className: "custom-class",
    variant: "light",
  },
};
