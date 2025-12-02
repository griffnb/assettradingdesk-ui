import type { Meta, StoryObj } from "@storybook/react-vite";
import { OpportunitiesShowcase } from "./OpportunitiesShowcase";

const meta: Meta<typeof OpportunitiesShowcase> = {
  title: "Common/Examples/Screens/OpportunitiesShowcase",
  component: OpportunitiesShowcase,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
