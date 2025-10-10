import type { Meta, StoryObj } from "@storybook/react";
import { ClearMarker } from "./ClearMarker";

const meta = {
  title: "Common/Fields/Select/ClearMarker",
  component: ClearMarker,
  argTypes: {
    clearSelection: { action: "cleared" },
    variant: {
      control: "select",
      options: ["default"],
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof ClearMarker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    clearSelection: () => {},
    variant: "default",
    className: "",
  },
};

export const CustomClass: Story = {
  args: {
    clearSelection: () => {},
    variant: "default",
    className: "custom-class",
  },
};
