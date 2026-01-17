import { ServerService } from "@/common_lib/services/ServerService";
import { addMock } from "@/models/mocks/helpers";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { ModelDetails } from "./ModelDetails";

const meta = {
  title: "Customer/Models/ModelDetails",
  component: ModelDetails,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    model: {
      description: "The model instance to display",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof ModelDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create mock models
const mockASMLModel = Store.model.create({
  id: "1",
  name: "TWINSCAN NXE:3400C",
  slug: "twinscan-nxe-3400c",
  description:
    "The TWINSCAN NXE:3400C is ASML's high-volume extreme ultraviolet (EUV) lithography system. It delivers superior imaging performance and productivity for advanced semiconductor manufacturing at 7nm, 5nm, and beyond. This system is essential for producing the most advanced chips used in smartphones, data centers, and artificial intelligence applications. The EUV technology enables chip manufacturers to continue Moore's Law scaling while reducing the number of patterning steps required.",
  manufacturer_id: "1",
  manufacturer_name: "ASML",
  category_name: "EUV Lithography Systems",
  asset_count: 8,
});

// Create mock assets for the model
const mockAssets = [
  Store.asset.create({
    id: "a1",
    model_id: "1",
    manufacturer_name: "ASML",
    year: 2021,
    price: 125000000,
    location: "Santa Clara, CA",
    description: "Available for immediate shipment",
    operational_status: 1,
    install_status: 1,
    quantity: 1,
  }),
  Store.asset.create({
    id: "a2",
    model_id: "1",
    manufacturer_name: "ASML",
    year: 2020,
    price: 115000000,
    location: "Hsinchu, Taiwan",
    description: "Low usage hours, excellent condition",
    operational_status: 1,
    install_status: 0,
    quantity: 1,
  }),
  Store.asset.create({
    id: "a3",
    model_id: "1",
    manufacturer_name: "ASML",
    year: 2022,
    price: 135000000,
    location: "Dresden, Germany",
    description: "Recently decommissioned, warranty available",
    operational_status: 1,
    install_status: 1,
    quantity: 1,
  }),
];

export const Default: Story = {
  args: {
    model: mockASMLModel,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default view showing model details with header, breadcrumb, and assets list. The component fetches assets dynamically.",
      },
    },
  },
  beforeEach: () => {
    ServerService.clearMocks();
    addMock<AssetModel[]>("/assets", "GET", mockAssets);
  },
};
