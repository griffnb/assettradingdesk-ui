import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum value of the slider"
    },
    max: {
      control: { type: "number" },
      description: "Maximum value of the slider"
    },
    defaultValue: {
      control: { type: "object" },
      description: "Default values for the slider"
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the slider"
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [50],
  },
};

export const MinMaxRange: Story = {
  args: {
    min: 10,
    max: 90,
    defaultValue: [30],
  },
  name: "Custom Min/Max Range",
};

export const MultiThumb: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [25, 75],
  },
  name: "Multi-Thumb Slider",
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState([50]);

    return (
      <div>
        <Slider
          {...args}
          value={value}
          onValueChange={setValue}
        />
        <p className="mt-2">Current Value: {value[0]}</p>
      </div>
    );
  },
  name: "Controlled Slider",
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [50],
    disabled: true,
  },
};

export const CustomStyling: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [50],
    className: "bg-blue-50 p-4 rounded-lg",
  },
  name: "Custom Styling",
};