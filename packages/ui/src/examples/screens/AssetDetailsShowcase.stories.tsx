import type { Meta, StoryObj } from "@storybook/react";
import { AssetDetailsShowcase } from "./AssetDetailsShowcase";

const meta: Meta<typeof AssetDetailsShowcase> = {
  title: "Common/Examples/Screens/AssetDetailsShowcase",
  component: AssetDetailsShowcase,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
