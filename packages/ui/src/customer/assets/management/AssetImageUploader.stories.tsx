import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AssetImageUploader } from "./AssetImageUploader";

const meta = {
  title: "Customer/Assets/Management/AssetImageUploader",
  component: AssetImageUploader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AssetImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    asset: Store.asset.create({
      id: "mock-asset-123",
      model_name: "NXE:3600D",
      manufacturer_name: "ASML",
      price: 124000000,
      year: 2020,
      location: "Hsinchu, Taiwan",
    }),
    setImages: () => {
      console.log("Images set");
    },
    images: [],
    wrappedImages: [],
    isUploading: false,
  },
};

export const WithAssetLabel: Story = {
  args: {
    asset: Store.asset.create({
      id: "mock-asset-456",
      model_name: "J750",
      manufacturer_name: "Teradyne",
      price: 3500000,
      year: 2019,
      location: "Singapore",
    }),
    setImages: () => {
      console.log("Images set");
    },
    images: [],
    wrappedImages: [],
    isUploading: false,
  },
};
