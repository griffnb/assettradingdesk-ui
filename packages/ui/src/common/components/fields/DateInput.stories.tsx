import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { useState } from "react";
import { DateInput } from "./DateInput";

const meta = {
  title: "Common/Fields/DateInput",
  component: DateInput,
  argTypes: {
    value: { control: "date" },
    helpText: { control: "text" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
    allowClear: { control: "boolean" },
    append: { control: "text" },
    handleChange: { action: "changed" },
  },
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: dayjs(),
    handleChange: () => {},
    prepend: <i className="fa fa-calendar pointer-events-none"></i>,
  },
  render: (args) => {
    const [value, setValue] = useState<dayjs.Dayjs | null>(args.value || null);
    return (
      <DateInput
        {...args}
        value={value || undefined}
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
    value: undefined,
    placeholder: "Select a date",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<dayjs.Dayjs | null>(args.value || null);
    return (
      <DateInput
        {...args}
        value={value || undefined}
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
    value: undefined,
    errorMessages: ["This field is required.", "Please select a valid date."],
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<dayjs.Dayjs | null>(args.value || null);
    return (
      <DateInput
        {...args}
        value={value || undefined}
        handleChange={(newValue) => {
          setValue(newValue);
          args.handleChange(newValue);
        }}
      />
    );
  },
};

export const WithHelpText: Story = {
  args: {
    value: undefined,
    helpText: "This is a help text.",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<dayjs.Dayjs | null>(args.value || null);
    return (
      <DateInput
        {...args}
        value={value || undefined}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithMinMaxDate: Story = {
  args: {
    value: dayjs(),
    minDate: new Date("2022-01-01"),
    maxDate: new Date("2023-12-31"),
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<dayjs.Dayjs | null>(args.value || null);
    return (
      <DateInput
        {...args}
        value={value || undefined}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithClearOption: Story = {
  args: {
    value: dayjs(),
    allowClear: true,
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<dayjs.Dayjs | null>(args.value || null);
    return (
      <DateInput
        {...args}
        value={value || undefined}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};

export const WithAppend: Story = {
  args: {
    value: dayjs(),
    append: "Append",
    handleChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<dayjs.Dayjs | null>(args.value || null);
    return (
      <DateInput
        {...args}
        value={value || undefined}
        handleChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  },
};
