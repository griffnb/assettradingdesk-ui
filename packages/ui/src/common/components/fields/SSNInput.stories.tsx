import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SSNInput } from "./SSNInput";

const meta = {
  title: "Common/Fields/SSNInput",
  component: SSNInput,
} satisfies Meta<typeof SSNInput>;

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
      <SSNInput
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
    placeholder: "Enter SSN",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SSNInput
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
    prepend: "SSN",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SSNInput
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
      <SSNInput
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
    errorMessages: ["This field is required.", "Please enter a valid SSN."],
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SSNInput
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
    prepend: "SSN",
    append: "Append",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SSNInput
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
      <SSNInput
        {...args}
        value={value}
        handleChange={(val) => {
          setValue(val);
        }}
      />
    );
  },
};
