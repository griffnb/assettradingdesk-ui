import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ColorInput } from "./ColorInput";

const meta = {
  title: "Common/Fields/ColorInput",
  component: ColorInput,
  argTypes: {
    value: { control: "color" },
    placeholder: { control: "text" },
    helpText: { control: "text" },
    prepend: { control: "text" },
    append: { control: "text" },
    position: { control: "inline-radio", options: ["top", "bottom"] },
  },
} satisfies Meta<typeof ColorInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "#ff0000",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <ColorInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: "",
    placeholder: "Enter color",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <ColorInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    value: "",
    errorMessages: ["This field is required.", "Please enter a valid color."],
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <ColorInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithHelpText: Story = {
  args: {
    value: "",
    helpText: "This is a help text.",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <ColorInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithPrepend: Story = {
  args: {
    value: "",
    prepend: "Prepend",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <ColorInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithAppend: Story = {
  args: {
    value: "",
    append: "Append",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <ColorInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithPrependAndAppend: Story = {
  args: {
    value: "",
    prepend: "Prepend",
    append: "Append",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <ColorInput
        {...args}
        value={value}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};
