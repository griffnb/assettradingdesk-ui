import type { Meta, StoryObj } from "@storybook/react";
import { PipelineBoardShowcase } from "./PipelineBoardShowcase";

const meta: Meta<typeof PipelineBoardShowcase> = {
  title: "Common/Examples/Screens/PipelineBoardShowcase",
  component: PipelineBoardShowcase,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
