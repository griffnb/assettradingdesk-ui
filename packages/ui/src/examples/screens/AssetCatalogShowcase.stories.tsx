import type { Meta, StoryObj } from "@storybook/react";
import { AssetCatalogShowcase } from "./AssetCatalogShowcase";

const meta: Meta<typeof AssetCatalogShowcase> = {
  title: "Common/Examples/Screens/AssetCatalogShowcase",
  component: AssetCatalogShowcase,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
