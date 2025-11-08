import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

// Mock the ServerService
export * from "@/common_lib/services/ServerService";

const meta = {
  component: Tabs,
  title: "Admin/Tabs/Tabs",
  argTypes: {
    tabs: { control: "object" },
    className: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "light"], // Add more variants if available
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleTabs = [
  { key: "tab1", label: "Tab 1", component: <div>Tab 1</div> },
  { key: "tab2", label: "Tab 2", component: <div>Tab 2</div> },
  { key: "tab3", label: "Tab 3", count: 5, component: <div>Tab 3</div> },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    className: "",
    variant: "default",
  },
};

export const Light: Story = {
  args: {
    tabs: sampleTabs,
    className: "",
    variant: "light",
  },
};
