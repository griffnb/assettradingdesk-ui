import type { Meta, StoryObj } from "@storybook/react";
import { NewUpgrade } from "./NewUpgrade";

const meta: Meta<typeof NewUpgrade> = {
  title: "Customer/Components/Onboarding/NewUpgrade",
  component: NewUpgrade,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <NewUpgrade
        onSelectFree={() => {
          console.log("Free tier selected");
        }}
        onSelectSeller={() => {
          console.log("Seller tier selected");
        }}
      />
    );
  },
};

export const WithoutCallbacks: Story = {
  render: () => {
    return <NewUpgrade />;
  },
};

export const FreeTierOnly: Story = {
  render: () => {
    return (
      <NewUpgrade
        onSelectFree={() => {
          console.log("Free tier selected");
          alert("You've selected the Free tier!");
        }}
      />
    );
  },
};

export const SellerTierOnly: Story = {
  render: () => {
    return (
      <NewUpgrade
        onSelectSeller={() => {
          console.log("Seller tier selected");
          alert("You've selected the Seller tier!");
        }}
      />
    );
  },
};
