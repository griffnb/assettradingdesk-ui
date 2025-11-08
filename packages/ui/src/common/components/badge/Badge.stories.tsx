import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Common/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["pillColor", "pillOutline", "badgeColor", "badgeOutline"],
    },
    color: {
      control: "select",
      options: [
        "gray",
        "brand",
        "error",
        "warning",
        "success",
        "gray-blue",
        "blue-light",
        "teal",
        "indigo",
        "purple",
        "pink",
        "orange",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    prependIcon: { control: false },
    appendIcon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "sm",
    color: "gray",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    color: "gray",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    color: "gray",
    children: "Large",
  },
};

export const SmallIcon: Story = {
  args: {
    size: "sm",
    color: "gray",
    children: "Small",
    prependIcon: <div className="size-1.5 rounded-full bg-[#344054]" />,
  },
};

export const MediumIcon: Story = {
  args: {
    size: "md",
    color: "gray",
    children: "Medium",
    prependIcon: <div className="size-1.5 rounded-full bg-[#344054]" />,
  },
};

export const LargeIcon: Story = {
  args: {
    size: "lg",
    color: "gray",
    children: "Large",
    prependIcon: <div className="size-1.5 rounded-full bg-[#344054]" />,
  },
};
