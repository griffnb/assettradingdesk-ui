import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextInput } from "./TextInput";

const meta = {
  title: "Common/Fields/TextInput",
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "hello",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <TextInput
        {...args}
        value={value}
        handleChange={(val) => {
          setValue(val);
        }}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: "",
    placeholder: "Enter text here",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <TextInput
        {...args}
        value={value}
        handleChange={(val) => {
          setValue(val);
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
      <TextInput
        {...args}
        value={value}
        handleChange={(val) => {
          setValue(val);
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
      <TextInput
        {...args}
        value={value}
        handleChange={(val) => {
          setValue(val);
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    value: "",
    errorMessages: ["This field is required.", "Please enter a valid value."],
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <TextInput
        {...args}
        value={value}
        handleChange={(val) => {
          setValue(val);
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
      <TextInput
        {...args}
        value={value}
        handleChange={(val) => {
          setValue(val);
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
      <TextInput
        {...args}
        value={value}
        handleChange={(val) => {
          setValue(val);
        }}
      />
    );
  },
};
