import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleInput } from "./ToggleInput";

// Mock the ServerService
export * from "@/common_lib/services/ServerService";

const meta = {
  component: ToggleInput,
  title: "Common/Fields/ToggleInput",
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "custom"], // Add more variants if available
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof ToggleInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Toggle Label",
    variant: "default",
    className: "",
    handleChange: () => {},
    value: false,
    checkedValue: true,
  },
};

export const Checked: Story = {
  args: {
    label: "Toggle Label",
    variant: "default",
    className: "",
    handleChange: () => {},
    value: true,
    checkedValue: true,
  },
};

export const CustomVariant: Story = {
  args: {
    label: "Custom Toggle",
    variant: "custom",
    className: "custom-class",
    handleChange: () => {},
    value: false,
    checkedValue: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: "",
    variant: "default",
    className: "",
    handleChange: () => {},
    value: false,
    checkedValue: true,
  },
};
