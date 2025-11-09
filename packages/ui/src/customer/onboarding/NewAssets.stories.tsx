import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react";
import { NewAssets } from "./NewAssets";

const meta: Meta<typeof NewAssets> = {
  title: "Customer/Components/Onboarding/NewAssets",
  component: NewAssets,
  argTypes: {
    onSuccess: {
      action: "success",
      description: "Called when asset is successfully saved",
    },
    onCancel: {
      action: "cancel",
      description: "Called when user cancels the form",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const asset = Store.asset.create({
      description: "",
      location: "",
      year: 0,
      price: 0,
      quantity: 1,
      configuration_notes: "",
      install_status: 0,
      operational_status: 0,
    });

    return (
      <NewAssets
        record={asset}
        onSuccess={args.onSuccess}
        onCancel={args.onCancel}
      />
    );
  },
};

export const WithInitialData: Story = {
  render: (args) => {
    const asset = Store.asset.create({
      description: "High-performance semiconductor equipment",
      location: "San Jose, California",
      year: 2020,
      price: 500000,
      quantity: 1,
      configuration_notes:
        "Fully upgraded with latest automation kits. Recent service completed.",
      install_status: 1,
      operational_status: 1,
    });

    return (
      <NewAssets
        record={asset}
        onSuccess={args.onSuccess}
        onCancel={args.onCancel}
      />
    );
  },
};

export const PartiallyFilled: Story = {
  render: (args) => {
    const asset = Store.asset.create({
      description: "Industrial equipment",
      location: "Austin, Texas",
      year: 2018,
      price: 0,
      quantity: 2,
      configuration_notes: "",
      install_status: 2,
      operational_status: 2,
    });

    return (
      <NewAssets
        record={asset}
        onSuccess={args.onSuccess}
        onCancel={args.onCancel}
      />
    );
  },
};
