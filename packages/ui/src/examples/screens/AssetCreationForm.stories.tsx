import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react";
import { AssetCreationForm } from "@/ui/customer/assets/management/AssetCreationForm";
import { AssetModel } from "@/models/models/asset/model/AssetModel";

const meta = {
  title: "Examples/Screens/AssetCreationForm",
  component: AssetCreationForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AssetCreationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyForm: Story = {
  args: {
    record: Store.asset.create({
      price: 0,
      year: new Date().getFullYear(),
      quantity: 1,
      install_status: 0,
      operational_status: 0,
      location: "",
      configuration_notes: "",
      description: "",
      notes: "",
      serial_number: "",
    }),
    onSuccess: (record: AssetModel) => {
      console.log("Asset created successfully:", record);
      alert("Asset created successfully! Check console for details.");
    },
    onCancel: () => {
      console.log("Asset creation cancelled");
      alert("Asset creation cancelled");
    },
  },
};

export const PrefilledHighValue: Story = {
  args: {
    record: Store.asset.create({
      model_id: "asml-nxe-3600d",
      manufacturer_name: "ASML",
      year: 2020,
      location: "Hsinchu, Taiwan",
      price: 124000000,
      notes: "25 / 50 / 25 milestone",
      configuration_notes:
        "Twin-stage EUV pellicle upgrade complete · Includes two spare source modules · Cymer service through 2026 · APC integration with FabOS coming with license transfer.",
      description: "Feb 10 – Mar 05",
      serial_number: "Requires 13.8kV / cleanroom ISO 1",
      operational_status: 1,
      install_status: 1,
      quantity: 1,
    }),
    onSuccess: (record: AssetModel) => {
      console.log("Asset created successfully:", record);
      alert("High-value asset created! Price: $" + record.price.toLocaleString());
    },
    onCancel: () => {
      console.log("Asset creation cancelled");
      alert("Asset creation cancelled");
    },
  },
};

export const PartiallyFilled: Story = {
  args: {
    record: Store.asset.create({
      model_id: "lam-research-2300",
      manufacturer_name: "Lam Research",
      year: 2018,
      location: "Singapore",
      price: 5500000,
    }),
    onSuccess: (record: AssetModel) => {
      console.log("Asset created successfully:", record);
    },
    onCancel: () => {
      console.log("Asset creation cancelled");
    },
  },
};

export const WithValidationEnabled: Story = {
  args: {
    record: Store.asset.create({
      price: 0,
      year: new Date().getFullYear(),
      quantity: 1,
      install_status: 0,
      operational_status: 0,
      tryValidation: true,
    }),
    onSuccess: (record: AssetModel) => {
      console.log("Asset created successfully:", record);
    },
    onCancel: () => {
      console.log("Asset creation cancelled");
    },
  },
};
