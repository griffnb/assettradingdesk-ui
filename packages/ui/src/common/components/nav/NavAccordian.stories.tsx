import type { Meta, StoryObj } from "@storybook/react";
import { NavAccordian } from "./NavAccordian";
import { NavAccordianLink } from "./NavAccordianLink";

const meta = {
  component: NavAccordian,
  title: "Common/Nav/NavAccordian",
  argTypes: {
    icon: { control: "text" },
    label: { control: "text" },
    isMenuOpen: { control: "boolean" },
    children: { control: "text" },
    variant: { control: { type: "select", options: ["light", "dark"] } },
    notifications: { control: "number" },
  },
} satisfies Meta<typeof NavAccordian>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "fas fa-folder",
    label: "Folder",
    isMenuOpen: false,
    toggleMenu: () => {},
    children: (
      <>
        <NavAccordianLink icon="fas fa-file" route="/file1" label="File 1" />
        <NavAccordianLink icon="fas fa-file" route="/file2" label="File 2" />
      </>
    ),
  },
};

export const Dark: Story = {
  args: {
    icon: "fas fa-folder",
    label: "Folder",
    isMenuOpen: false,
    toggleMenu: () => {},
    variant: "dark",
    children: (
      <>
        <NavAccordianLink icon="fas fa-file" route="/file1" label="File 1" />
        <NavAccordianLink icon="fas fa-file" route="/file2" label="File 2" />
      </>
    ),
  },
};

export const WithChildren: Story = {
  args: {
    icon: "fas fa-folder",
    label: "Folder",
    isMenuOpen: true,
    toggleMenu: () => {},
    children: (
      <>
        <NavAccordianLink icon="fas fa-file" route="/file1" label="File 1" />
        <NavAccordianLink icon="fas fa-file" route="/file2" label="File 2" />
        <NavAccordianLink icon="fas fa-file" route="/file3" label="File 3" />
      </>
    ),
  },
};
