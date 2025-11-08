import type { Meta, StoryObj } from "@storybook/react";
import { TaxonomyLandingShowcase } from "./TaxonomyLandingShowcase";

const meta: Meta<typeof TaxonomyLandingShowcase> = {
  title: "Common/Examples/Screens/TaxonomyLandingShowcase",
  component: TaxonomyLandingShowcase,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
