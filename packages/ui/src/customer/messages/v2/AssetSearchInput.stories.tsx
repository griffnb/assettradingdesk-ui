import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AssetSearchInput } from "./AssetSearchInput";

const meta: Meta<typeof AssetSearchInput> = {
  title: "Customer/Components/Messages/V2/AssetSearchInput",
  component: AssetSearchInput,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a mock asset for stories
const createMockAsset = (
  id: string,
  name: string,
  year: number,
): AssetModel => {
  const mockAsset = Store.asset.create({
    id,
    manufacturer_name: "Applied Materials",
    model_name: name,
    year,
    price: 125000,
    location: "San Jose, CA",
    asset_files: [],
  });
  return mockAsset;
};

export const Default: Story = {
  render: () => {
    const [selectedAsset, setSelectedAsset] = useState<AssetModel | null>(null);

    return (
      <AssetSearchInput
        selectedAsset={selectedAsset}
        onSelect={setSelectedAsset}
      />
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const mockAsset = createMockAsset("1", "Centura DPS II", 2015);
    const [selectedAsset, setSelectedAsset] = useState<AssetModel | null>(
      mockAsset,
    );

    return (
      <AssetSearchInput
        selectedAsset={selectedAsset}
        onSelect={setSelectedAsset}
      />
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedAsset, setSelectedAsset] = useState<AssetModel | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <AssetSearchInput
          selectedAsset={selectedAsset}
          onSelect={setSelectedAsset}
        />
        {selectedAsset && (
          <div className="rounded border border-neutral-200 bg-neutral-50 p-3 text-sm">
            <div className="font-semibold">Selected Asset:</div>
            <div>ID: {selectedAsset.id}</div>
            <div>
              Name: {selectedAsset.manufacturer_name} {selectedAsset.model_name}
            </div>
            <div>Year: {selectedAsset.year}</div>
          </div>
        )}
      </div>
    );
  },
};
