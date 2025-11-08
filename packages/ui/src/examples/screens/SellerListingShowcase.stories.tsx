import type { Meta, StoryObj } from "@storybook/react";
import { SellerListingShowcase } from "./SellerListingShowcase";

const meta: Meta<typeof SellerListingShowcase> = {
  title: "Common/Examples/Screens/SellerListingShowcase",
  component: SellerListingShowcase,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
