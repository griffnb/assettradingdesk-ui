import type { Meta, StoryObj } from "@storybook/react";
import { SearchAlertsShowcase } from "./SearchAlertsShowcase";

const meta: Meta<typeof SearchAlertsShowcase> = {
  title: "Common/Examples/Screens/SearchAlertsShowcase",
  component: SearchAlertsShowcase,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
