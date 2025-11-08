import type { Meta, StoryObj } from "@storybook/react-vite";
import RadioBase from "./RadioBase";

const meta = {
  title: "Common/Fields/Base/RadioBase",
  component: RadioBase,
  argTypes: {
    value: { control: "text" },
    checkedValue: { control: "text" },
    handleChange: { action: "changed" },
    name: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "custom"], // Add more variants if available
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof RadioBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "option1",
    checkedValue: "option1",
    handleChange: () => {},
    name: "radioGroup",
    variant: "default",
    className: "",
  },
};

export const Unchecked: Story = {
  args: {
    value: "option1",
    checkedValue: "option2",
    handleChange: () => {},
    name: "radioGroup",
    variant: "default",
    className: "",
  },
};

export const CustomVariant: Story = {
  args: {
    value: "option1",
    checkedValue: "option1",
    handleChange: () => {},
    name: "radioGroup",
    variant: "custom",
    className: "custom-class",
  },
};
