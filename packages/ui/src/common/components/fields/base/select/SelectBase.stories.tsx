import type { Meta, StoryObj } from "@storybook/react";

import { IConstant } from "@/models/types/constants";
import { useState } from "react";
import { SelectBase } from "./SelectBase";

const meta = {
  title: "Common/Fields/Base/SelectBase",

  component: SelectBase<IConstant>,
  argTypes: {
    options: { control: "object" },
    errorMessages: { control: "object" },
    handleChange: { control: false },
    selected: { control: false },
    idField: { control: false },
    optionField: { control: false },
    searchFunction: { control: false },
    showClear: { control: "boolean" },
    prepend: { control: false },
    append: { control: false },
  },
} satisfies Meta<typeof SelectBase<IConstant>>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: IConstant[] = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  { id: 4, label: "Option 4" },
  { id: 5, label: "Option 5" },
  { id: 6, label: "Option 6" },
  { id: 7, label: "Option 7" },
  { id: 8, label: "Option 8" },
  { id: 9, label: "Option 9" },
];

export const Default: Story = {
  args: {
    options: options,
    errorMessages: [],
    handleChange: () => {},
    selected: undefined,
    idField: "id",
    optionField: "label",
    searchFunction: async () => {},
    showClear: true,
    prepend: null,
    append: null,
    placeholder: "Select an option",
  },
  render: (args) => {
    const [value, setValue] = useState<IConstant | undefined>();
    return (
      <SelectBase
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
    options: options,
    errorMessages: [],
    handleChange: () => {},
    selected: { id: 1, label: "Option 1" },
    idField: "id",
    optionField: "label",
    searchFunction: async () => {},
    showClear: true,
    prepend: null,
    append: null,
  },
  render: (args) => {
    const [value, setValue] = useState<IConstant | undefined>();
    return (
      <SelectBase
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
    options: options,
    errorMessages: ["one error", "two error"],
    handleChange: () => {},
    selected: undefined,
    idField: "id",
    optionField: "label",
    searchFunction: async () => {},
    showClear: true,
    prepend: null,
    append: null,
  },
  render: (args) => {
    const [value, setValue] = useState<IConstant | undefined>();
    return (
      <SelectBase
        {...args}
        selected={value}
        handleChange={(e) => {
          setValue(e);
        }}
      />
    );
  },
};

export const NoSearch: Story = {
  args: {
    options: options,
    errorMessages: [],
    handleChange: () => {},
    selected: undefined,
    idField: "id",
    optionField: "label",
    searchFunction: async () => {},
    showClear: true,
    prepend: null,
    append: null,
    noSearch: true,
  },
  render: (args) => {
    const [value, setValue] = useState<IConstant | undefined>();
    return (
      <SelectBase
        {...args}
        selected={value}
        handleChange={(e) => {
          setValue(e);
        }}
      />
    );
  },
};
