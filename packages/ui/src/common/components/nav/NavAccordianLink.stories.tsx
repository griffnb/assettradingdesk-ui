import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavAccordianLink } from "./NavAccordianLink";

const meta = {
  component: NavAccordianLink,
  title: "Common/Nav/NavAccordianLink",
  argTypes: {
    icon: { control: "text" },
    route: { control: "text" },
    label: { control: "text" },
    children: { control: "text" },
    variant: {
      control: { type: "select", options: ["light", "dark"] },
    },
  },
} satisfies Meta<typeof NavAccordianLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "fas fa-home",
    route: "/home",
    label: "Home",
    children: null,
  },
};

export const Dark: Story = {
  args: {
    icon: "fas fa-home",
    route: "/home",
    label: "Home",
    children: null,
    variant: "dark",
  },
};

export const WithChildren: Story = {
  args: {
    icon: "fas fa-folder",
    route: "/folder",
    label: "Folder",
    children: (
      <>
        <i className="fas fa-folder-open text-white"></i>
        <span>Folder Open</span>
      </>
    ),
  },
};

export const WithAppendChild: Story = {
  args: {
    icon: "fas fa-bell",
    route: "/notifications",
    label: "Notifications",
    children: null,
  },
};
