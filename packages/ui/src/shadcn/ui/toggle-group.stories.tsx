import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { toggleVariants } from "./toggle";

const meta: Meta<typeof ToggleGroup> = {
  title: "Common/Components/UI/ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual variant of the toggle group",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Size of the toggle group",
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Selection type of the toggle group",
    },
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    type: "single",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    type: "single",
  },
};

export const MultiSelect: Story = {
  args: {
    variant: "default",
    size: "default",
    type: "multiple",
  },
};

export const Small: Story = {
  args: {
    variant: "default",
    size: "sm",
    type: "single",
  },
};

export const Large: Story = {
  args: {
    variant: "default",
    size: "lg",
    type: "single",
  },
};