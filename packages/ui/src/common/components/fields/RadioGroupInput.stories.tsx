import { IConstant } from "@/models/types/constants";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RadioGroupInput } from "./RadioGroupInput";

const meta = {
  title: "Common/Fields/RadioGroupInput",
  component: RadioGroupInput,
  argTypes: {
    flex: { control: "select", options: ["row", "column", "grid"] },
    options: { control: "object" },
  },
} satisfies Meta<typeof RadioGroupInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: IConstant[] = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
];

export const Default: Story = {
  args: {
    options: options,
    value: undefined,
    name: "radioGroup",
    onChange: () => {},
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value);
    return (
      <RadioGroupInput
        {...args}
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value?.id);
          args.onChange(value);
        }}
      />
    );
  },
};

export const WithSelectedValue: Story = {
  args: {
    options: options,
    value: "2",
    name: "radioGroup",
    onChange: () => {},
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value);
    return (
      <RadioGroupInput
        {...args}
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value?.id);
          args.onChange(value);
        }}
      />
    );
  },
};

export const WithHelpText: Story = {
  args: {
    options: options,
    value: undefined,
    name: "radioGroup",
    onChange: () => {},
    helpText: "This is a help text.",
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value);
    return (
      <RadioGroupInput
        {...args}
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value?.id);
          args.onChange(value);
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    options: options,
    value: undefined,
    name: "radioGroup",
    onChange: () => {},
    errorMessages: ["This field is required."],
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value);
    return (
      <RadioGroupInput
        {...args}
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value?.id);
          args.onChange(value);
        }}
      />
    );
  },
};
