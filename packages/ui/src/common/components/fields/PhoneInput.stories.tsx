import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PhoneInput } from "./PhoneInput";

const meta = {
  title: "Common/Fields/PhoneInput",
  component: PhoneInput,
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PhoneInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
          args.handleChange(newValue);
        }}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: "",
    placeholder: "Enter phone number",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PhoneInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
          args.handleChange(newValue);
        }}
      />
    );
  },
};

export const WithPrependAndAppend: Story = {
  args: {
    value: "",
    placeholder: "Enter phone number",
    handleChange: () => {},
    prepend: "+1",
    append: "Ext.",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PhoneInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
          args.handleChange(newValue);
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    value: "",
    errorMessages: [
      "This field is required.",
      "Please enter a valid phone number.",
    ],
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PhoneInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
          args.handleChange(newValue);
        }}
      />
    );
  },
};
