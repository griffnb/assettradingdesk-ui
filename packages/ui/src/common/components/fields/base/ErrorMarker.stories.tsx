import type { Meta, StoryObj } from "@storybook/react";
import { ErrorMarker } from "./ErrorMarker";

const meta = {
  title: "Common/Fields/Select/ErrorMarker",
  component: ErrorMarker,
  argTypes: {
    variant: {
      control: "select",
      options: ["default"],
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof ErrorMarker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    className: "",
  },
};

export const CustomClass: Story = {
  args: {
    variant: "default",
    className: "custom-class",
  },
};
