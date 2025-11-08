import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import RadioInput from "./RadioInput";

const meta = {
  title: "Common/Fields/RadioInput",
  component: RadioInput,
  argTypes: {
    value: { control: "text" },
    checkedValue: { control: "text" },
    label: { control: "text" },
    name: { control: "text" },
    icon: { control: "text" },
    errorMessages: { control: "object" },
    helpText: { control: "text" },
    handleChange: { action: "changed" },
  },
} satisfies Meta<typeof RadioInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "option1",
    checkedValue: "option1",
    label: "Option 1",
    name: "radioGroup",
    handleChange: () => {},
  },
  render: (args) => {
    const [checkedValue, setCheckedValue] = useState(args.checkedValue);
    return (
      <RadioInput
        {...args}
        checkedValue={checkedValue}
        handleChange={(value) => {
          setCheckedValue(value);
          args.handleChange(value);
        }}
      />
    );
  },
};

export const WithIcon: Story = {
  args: {
    value: "option1",
    checkedValue: "option1",
    label: "Option 1",
    name: "radioGroup",
    icon: "fa fa-check",
    handleChange: () => {},
  },
  render: (args) => {
    const [checkedValue, setCheckedValue] = useState(args.checkedValue);
    return (
      <RadioInput
        {...args}
        checkedValue={checkedValue}
        handleChange={(value) => {
          setCheckedValue(value);
          args.handleChange(value);
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    value: "option1",
    checkedValue: "option2",
    label: "Option 1",
    name: "radioGroup",
    errorMessages: ["This field is required."],
    handleChange: () => {},
  },
  render: (args) => {
    const [checkedValue, setCheckedValue] = useState(args.checkedValue);
    return (
      <RadioInput
        {...args}
        checkedValue={checkedValue}
        handleChange={(value) => {
          setCheckedValue(value);
          args.handleChange(value);
        }}
      />
    );
  },
};

export const WithHelpText: Story = {
  args: {
    value: "option1",
    checkedValue: "option1",
    label: "Option 1",
    name: "radioGroup",
    helpText: "This is a help text.",
    handleChange: () => {},
  },
  render: (args) => {
    const [checkedValue, setCheckedValue] = useState(args.checkedValue);
    return (
      <RadioInput
        {...args}
        checkedValue={checkedValue}
        handleChange={(value) => {
          setCheckedValue(value);
          args.handleChange(value);
        }}
      />
    );
  },
};
