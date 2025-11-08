import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react";
import { AssetCreationForm } from "./AssetCreationForm";

const meta = {
  title: "Customer/Assets/Management/AssetCreationForm",
  component: AssetCreationForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AssetCreationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
    onSuccess: (record) => {
      console.log("Asset created successfully:", record);
    },
    onCancel: () => {
      console.log("Asset creation cancelled");
    },
  },
};

export const WithPrefilledData: Story = {
  args: {
    record: Store.asset.create({
      model_id: "123",
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
    onSuccess: (record) => {
      console.log("Asset created successfully:", record);
    },
    onCancel: () => {
      console.log("Asset creation cancelled");
    },
  },
};

export const ValidationErrors: Story = {
  args: {
    record: Store.asset.create({
      price: 0,
      year: new Date().getFullYear(),
      quantity: 1,
      install_status: 0,
      operational_status: 0,
      tryValidation: true,
    }),
    onSuccess: (record) => {
      console.log("Asset created successfully:", record);
    },
    onCancel: () => {
      console.log("Asset creation cancelled");
    },
  },
};
