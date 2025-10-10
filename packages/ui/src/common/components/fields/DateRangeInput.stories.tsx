import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import { useState } from "react";
import { DateRangeInput } from "./DateRangeInput";

const meta = {
  title: "Common/Fields/DateRangeInput",
  component: DateRangeInput,
  argTypes: {
    helpText: { control: "text" },
    handleChange: { action: "changed" },
  },
} satisfies Meta<typeof DateRangeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    start: dayjs(),
    end: dayjs(),
    handleChange: () => {},
  },
  render: (args) => {
    const [startDate, setStartDate] = useState(args.start);
    const [endDate, setEndDate] = useState(args.end);
    return (
      <DateRangeInput
        {...args}
        start={startDate}
        end={endDate}
        handleChange={(newStartDate, newEndDate) => {
          setStartDate(newStartDate);
          setEndDate(newEndDate);
        }}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  args: {
    start: dayjs(),
    end: dayjs(),
    placeholder: "Select date range",
    handleChange: () => {},
  },
  render: (args) => {
    const [startDate, setStartDate] = useState(args.start);
    const [endDate, setEndDate] = useState(args.end);
    return (
      <DateRangeInput
        {...args}
        start={startDate}
        end={endDate}
        handleChange={(newStartDate, newEndDate) => {
          setStartDate(newStartDate);
          setEndDate(newEndDate);
        }}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    start: dayjs(),
    end: dayjs(),
    errorMessages: [
      "This field is required.",
      "Please select a valid date range.",
    ],
    handleChange: () => {},
  },
  render: (args) => {
    const [startDate, setStartDate] = useState(args.start);
    const [endDate, setEndDate] = useState(args.end);
    return (
      <DateRangeInput
        {...args}
        start={startDate}
        end={endDate}
        handleChange={(newStartDate, newEndDate) => {
          setStartDate(newStartDate);
          setEndDate(newEndDate);
        }}
      />
    );
  },
};
