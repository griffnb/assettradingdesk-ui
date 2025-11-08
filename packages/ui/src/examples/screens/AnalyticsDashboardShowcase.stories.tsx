import type { Meta, StoryObj } from "@storybook/react";
import { AnalyticsDashboardShowcase } from "./AnalyticsDashboardShowcase";

const meta: Meta<typeof AnalyticsDashboardShowcase> = {
  title: "Common/Examples/Screens/AnalyticsDashboardShowcase",
  component: AnalyticsDashboardShowcase,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
