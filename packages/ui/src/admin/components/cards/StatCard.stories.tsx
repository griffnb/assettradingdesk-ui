import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatCard } from "./StatCard";

// Mock the ServerService
export * from "@/common_lib/services/ServerService";

const meta = {
  component: StatCard,
  title: "Admin/Components/Cards/StatCard",
  argTypes: {
    stat: { control: "number" },
    subText: { control: "text" },
    icon: { control: "text" },
    className: { control: "text" },
    variant: {
      control: "select",
      options: ["default"], // Add more variants if available
    },
    text_color: {
      control: "select",
      options: ["default", "green", "red", "orange"],
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stat: 123,
    subText: "This is a subtext",
    className: "",
    variant: "default",
  },
};

export const WithIcon: Story = {
  args: {
    stat: 456,
    subText: "Another subtext",
    icon: "fa fa-chart-line",
    className: "custom-class",
    variant: "default",
    text_color: "green",
  },
};

export const WithDifferentStat: Story = {
  args: {
    stat: 789,
    subText: "Different subtext",
    icon: "fa fa-chart-pie",
    className: "",
    variant: "default",
  },
};
