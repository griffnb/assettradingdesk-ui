import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroupBase } from "./RadioGroupBase";

const meta = {
  title: "Common/Fields/Base/RadioGroupBase",
  component: RadioGroupBase,
  argTypes: {
    options: { control: "object" },
    checkedValue: { control: "text" },
    onChange: { action: "changed" },
    name: { control: "text" },
    label_variant: {
      control: "select",
      options: ["default"], // Add more variants if available
    },
    radio_variant: {
      control: "select",
      options: ["default"], // Add more variants if available
    },
  },
} satisfies Meta<typeof RadioGroupBase>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { id: "option1", label: "Option 1" },
  { id: "option2", label: "Option 2" },
  { id: "option3", label: "Option 3" },
];

export const Default: Story = {
  args: {
    options: options,
    checkedValue: "option1",
    onChange: () => {},
    name: "radioGroup",
    label_variant: "default",
    radio_variant: "default",
  },
};

export const Unchecked: Story = {
  args: {
    options: options,
    checkedValue: "",
    onChange: () => {},
    name: "radioGroup",
    label_variant: "default",
    radio_variant: "default",
  },
};

export const CustomVariant: Story = {
  args: {
    options: options,
    checkedValue: "option1",
    onChange: () => {},
    name: "radioGroup",
    label_variant: "default",
    radio_variant: "default",
  },
};
