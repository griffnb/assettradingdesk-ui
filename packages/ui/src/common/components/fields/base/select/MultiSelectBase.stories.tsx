import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MultiSelectBase } from "./MultiSelectBase";

interface Option {
  id: number;
  name: string;
}

const options: Option[] = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
  { id: 4, name: "Option 4" },
  { id: 5, name: "Option 5" },
  { id: 6, name: "Option 6" },
  { id: 7, name: "Option 7" },
  { id: 8, name: "Option 8" },
  { id: 9, name: "Option 9" },
];

const meta = {
  title: "Common/Fields/Base/MultiSelectBase",
  component: MultiSelectBase<Option>,
  argTypes: {
    closeOnSelect: { control: "boolean" },
    options: { control: "object" },
    errorMessages: { control: "object" },
    handleChange: { control: false },
    selected: { control: "object" },
    idField: { control: "text" },
    optionField: { control: "text" },
    searchFunction: { control: false },
    prepend: { control: false },
    append: { control: false },
    noSearch: { control: "boolean" },
  },
} satisfies Meta<typeof MultiSelectBase<Option>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    closeOnSelect: false,
    options: options,
    errorMessages: [],
    handleChange: () => {},
    selected: [],
    idField: "id",
    optionField: "name",
    searchFunction: async () => {},
    prepend: null,
    append: null,
    placeholder: "Select options",
  },
  render: (args) => {
    const [value, setValue] = useState<Option[]>([]);
    return (
      <MultiSelectBase
        {...args}
        selected={value}
        handleChange={(e) => {
          setValue(e);
        }}
      />
    );
  },
};

export const DefaultSelected: Story = {
  args: {
    closeOnSelect: false,
    options: options,
    errorMessages: [],
    handleChange: () => {},
    selected: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
    ],
    idField: "id",
    optionField: "name",
    searchFunction: async () => {},
    prepend: null,
    append: null,
  },
  render: (args) => {
    const [value, setValue] = useState<Option[]>([]);
    return (
      <MultiSelectBase
        {...args}
        selected={value}
        handleChange={(e) => {
          setValue(e);
        }}
      />
    );
  },
};

export const PrependAppend: Story = {
  args: {
    closeOnSelect: false,
    options: options,
    errorMessages: [],
    handleChange: () => {},
    selected: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
    ],
    idField: "id",
    optionField: "name",
    searchFunction: async () => {},
    prepend: "prepend",
    append: "append",
  },
  render: (args) => {
    const [value, setValue] = useState<Option[]>([]);
    return (
      <MultiSelectBase
        {...args}
        selected={value}
        handleChange={(e) => {
          setValue(e);
        }}
      />
    );
  },
};

export const Errors: Story = {
  args: {
    closeOnSelect: false,
    options: options,
    errorMessages: ["one error", "two error"],
    handleChange: () => {},
    selected: [],
    idField: "id",
    optionField: "name",
    searchFunction: async () => {},
    prepend: null,
    append: null,
  },
  render: (args) => {
    const [value, setValue] = useState<Option[]>([]);
    return (
      <MultiSelectBase
        {...args}
        selected={value}
        handleChange={(e) => {
          setValue(e);
        }}
      />
    );
  },
};

export const NoSearchCloseOnSelect: Story = {
  args: {
    closeOnSelect: true,
    options: options,
    errorMessages: [],
    handleChange: () => {},
    selected: [],
    idField: "id",
    optionField: "name",
    searchFunction: async () => {},
    prepend: null,
    append: null,
    noSearch: true,
  },
  render: (args) => {
    const [value, setValue] = useState<Option[]>([]);
    return (
      <MultiSelectBase
        {...args}
        selected={value}
        handleChange={(e) => {
          setValue(e);
        }}
      />
    );
  },
};
