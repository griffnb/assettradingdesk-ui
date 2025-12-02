import { IConstant } from "@/models/types/constants";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ComboBoxInput } from "./ComboBoxInput";

const meta = {
  title: "Common/Fields/ComboBoxInput",
  component: ComboBoxInput,
} satisfies Meta<typeof ComboBoxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: IConstant[] = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
];

export const Default: Story = {
  args: {
    options: options,
    value: undefined,
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<number>(0);
    return (
      <ComboBoxInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id as number);
        }}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: options,
    value: undefined,
    placeholder: "Select an option",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<any>("");
    return (
      <ComboBoxInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id as number);
        }}
      />
    );
  },
};

export const WithPrepend: Story = {
  args: {
    options: options,
    value: undefined,
    prepend: "Prepend",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<any>("");
    return (
      <ComboBoxInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id as number);
        }}
      />
    );
  },
};

export const WithAppend: Story = {
  args: {
    options: options,
    value: undefined,
    append: "Append",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<any>("");
    return (
      <ComboBoxInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id as number);
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    options: options,
    value: undefined,
    errorMessages: ["This field is required.", "Please select a valid option."],
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<any>("");
    return (
      <ComboBoxInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id as number);
        }}
      />
    );
  },
};

export const WithPrependAndAppend: Story = {
  args: {
    options: options,
    value: undefined,
    prepend: "Prepend",
    append: "Append",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<any>("");
    return (
      <ComboBoxInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id as number);
        }}
      />
    );
  },
};

export const WithHelpText: Story = {
  args: {
    options: options,
    value: undefined,
    helpText: "This is a help text.",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<any>("");
    return (
      <ComboBoxInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id as number);
        }}
      />
    );
  },
};
