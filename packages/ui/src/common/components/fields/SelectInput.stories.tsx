import { IConstant } from "@/models/types/constants";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SelectInput } from "./SelectInput";

const meta = {
  title: "Common/Fields/SelectInput",
  component: SelectInput,
} satisfies Meta<typeof SelectInput>;

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
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<any>("");
    return (
      <SelectInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id);
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
      <SelectInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id);
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
      <SelectInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id);
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
      <SelectInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id);
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
      <SelectInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id);
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
      <SelectInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id);
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
      <SelectInput
        {...args}
        value={value}
        handleChange={(e) => {
          setValue(e?.id);
        }}
      />
    );
  },
};
