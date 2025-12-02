import { IConstant } from "@/models/types/constants";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MultiSelectInput } from "./MultiSelectInput";

const meta = {
  title: "Common/Fields/MultiSelectInput",
  component: MultiSelectInput,
  argTypes: {},
} satisfies Meta<typeof MultiSelectInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: IConstant[] = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
  { id: "4", label: "Option 4" },
  { id: "5", label: "Option 5" },
];

export const Default: Story = {
  args: {
    options: options,
    values: [],
    handleChange: () => {},
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState(args.values);
    return (
      <MultiSelectInput
        {...args}
        values={selectedValues}
        handleChange={(newValues) => {
          setSelectedValues(newValues.map((v) => v.id as string));
        }}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: options,
    values: [],
    placeholder: "Select options",
    handleChange: () => {},
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState(args.values);
    return (
      <MultiSelectInput
        {...args}
        values={selectedValues}
        handleChange={(newValues) => {
          setSelectedValues(newValues.map((v) => v.id as string));
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    options: options,
    values: [],
    errorMessages: [
      "This field is required.",
      "Please select at least one option.",
    ],
    handleChange: () => {},
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState(args.values);
    return (
      <MultiSelectInput
        {...args}
        values={selectedValues}
        handleChange={(newValues) => {
          setSelectedValues(newValues.map((v) => v.id as string));
        }}
      />
    );
  },
};

export const WithPreselectedValues: Story = {
  args: {
    options: options,
    values: ["1", "3"],
    handleChange: () => {},
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState(args.values);
    return (
      <MultiSelectInput
        {...args}
        values={selectedValues}
        handleChange={(newValues) => {
          setSelectedValues(newValues.map((v) => v.id as string));
        }}
      />
    );
  },
};

export const WithComboBox: Story = {
  args: {
    options: options,
    values: ["1", "3"],
    handleChange: () => {},
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState(args.values);
    return (
      <MultiSelectInput
        {...args}
        values={selectedValues}
        as="combobox"
        handleChange={(newValues) => {
          setSelectedValues(newValues.map((v) => v.id as string));
        }}
      />
    );
  },
};
