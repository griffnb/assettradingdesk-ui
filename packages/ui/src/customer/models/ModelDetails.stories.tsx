import { IJSONAPIType } from "@/common_lib/services/ServerService";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";
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

const mockAppliedMaterialsModel = Store.model.create({
  id: "2",
  name: "Centura Ultimo",
  slug: "centura-ultimo",
  description:
    "The Applied Materials Centura Ultimo is an advanced metal deposition platform designed for critical interconnect applications in leading-edge logic and memory devices. This system provides superior film quality, uniformity, and throughput for copper barrier and seed layer deposition. The Ultimo platform is essential for manufacturing advanced chips at 7nm and smaller nodes.",
  manufacturer_id: "2",
  manufacturer_name: "Applied Materials",
  category_name: "Metal Deposition Systems",
  asset_count: 45,
});

const mockModelWithNoAssets = Store.model.create({
  id: "3",
  name: "TWINSCAN NXE:3600D",
  slug: "twinscan-nxe-3600d",
  description:
    "The latest generation EUV lithography system with enhanced productivity and imaging capabilities for next-generation semiconductor manufacturing.",
  manufacturer_id: "1",
  manufacturer_name: "ASML",
  category_name: "EUV Lithography Systems",
  asset_count: 0,
});

const mockModelShortDescription = Store.model.create({
  id: "4",
  name: "KLA Archer 700",
  slug: "kla-archer-700",
  description:
    "Advanced overlay metrology system for semiconductor manufacturing.",
  manufacturer_id: "4",
  manufacturer_name: "KLA Corporation",
  category_name: "Metrology Equipment",
  asset_count: 15,
});

const mockModelNoDescription = Store.model.create({
  id: "5",
  name: "Lam Kiyo",
  slug: "lam-kiyo",
  manufacturer_id: "3",
  manufacturer_name: "Lam Research",
  category_name: "Etch Systems",
  asset_count: 22,
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

// Mock Store.asset.query for stories
const mockAssetQuerySuccess = fn(
  async () =>
    ({
      success: true,
      data: mockAssets,
    }) as IJSONAPIType<AssetModel[]>,
);

const mockAssetQueryEmpty = fn(
  async () =>
    ({
      success: true,
      data: [] as AssetModel[],
    }) as IJSONAPIType<AssetModel[]>,
);

const mockAssetCountSuccess = fn(
  async () =>
    ({
      success: true,
      data: mockAssets.length,
    }) as IJSONAPIType<number>,
);

const mockAssetCountZero = fn(
  async () =>
    ({
      success: true,
      data: 0,
    }) as IJSONAPIType<number>,
);

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
  play: async () => {
    Store.asset.query = mockAssetQuerySuccess;
    // Mock ServerService.callGet for asset count
    const { ServerService } = await import(
      "@/common_lib/services/ServerService"
    );
    ServerService.callGet = fn(async (model: string, path: string) => {
      if (model === "asset" && path === "count") {
        return mockAssetCountSuccess();
      }
      return { success: false, error: "Not Found" };
    });
  },
};

export const WithManyAssets: Story = {
  args: {
    model: mockAppliedMaterialsModel,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Model with a high asset count showing how the layout handles multiple assets.",
      },
    },
  },
  play: async () => {
    Store.asset.query = mockAssetQuerySuccess;
    const { ServerService } = await import(
      "@/common_lib/services/ServerService"
    );
    ServerService.callGet = fn(async (model: string, path: string) => {
      if (model === "asset" && path === "count") {
        return { success: true, data: 45 } as IJSONAPIType<number>;
      }
      return { success: false, error: "Not Found" };
    });
  },
};

export const WithNoAssets: Story = {
  args: {
    model: mockModelWithNoAssets,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the empty state when a model has no assets available.",
      },
    },
  },
  play: async () => {
    Store.asset.query = mockAssetQueryEmpty;
    const { ServerService } = await import(
      "@/common_lib/services/ServerService"
    );
    ServerService.callGet = fn(async (model: string, path: string) => {
      if (model === "asset" && path === "count") {
        return mockAssetCountZero();
      }
      return { success: false, error: "Not Found" };
    });
  },
};

export const WithShortDescription: Story = {
  args: {
    model: mockModelShortDescription,
  },
  parameters: {
    docs: {
      description: {
        story: "Model with a brief description showing layout flexibility.",
      },
    },
  },
  play: async () => {
    Store.asset.query = mockAssetQuerySuccess;
    const { ServerService } = await import(
      "@/common_lib/services/ServerService"
    );
    ServerService.callGet = fn(async (model: string, path: string) => {
      if (model === "asset" && path === "count") {
        return { success: true, data: 15 } as IJSONAPIType<number>;
      }
      return { success: false, error: "Not Found" };
    });
  },
};

export const WithNoDescription: Story = {
  args: {
    model: mockModelNoDescription,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Model without a description, showing how the component handles missing content.",
      },
    },
  },
  play: async () => {
    Store.asset.query = mockAssetQuerySuccess;
    const { ServerService } = await import(
      "@/common_lib/services/ServerService"
    );
    ServerService.callGet = fn(async (model: string, path: string) => {
      if (model === "asset" && path === "count") {
        return { success: true, data: 22 } as IJSONAPIType<number>;
      }
      return { success: false, error: "Not Found" };
    });
  },
};

export const Loading: Story = {
  args: {
    model: mockASMLModel,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the loading state while assets are being fetched.",
      },
    },
  },
  play: async () => {
    // Mock a slow query that never resolves
    Store.asset.query = fn(async () => {
      return new Promise(() => {}); // Never resolves
    }) as any;
    const { ServerService } = await import(
      "@/common_lib/services/ServerService"
    );
    ServerService.callGet = fn(async () => {
      return new Promise(() => {}); // Never resolves
    }) as any;
  },
};

export const WithLongModelName: Story = {
  args: {
    model: Store.model.create({
      id: "6",
      name: "TWINSCAN NXE:3400C Advanced High-NA Extreme Ultraviolet Lithography System with Extended Productivity Features",
      slug: "twinscan-nxe-3400c-advanced-high-na",
      description:
        "This is an extremely advanced photolithography system featuring cutting-edge extreme ultraviolet technology with high numerical aperture optics specifically designed for next-generation semiconductor manufacturing at 3nm and below process nodes. The system incorporates revolutionary imaging capabilities, enhanced throughput optimization, and advanced overlay control mechanisms.",
      manufacturer_id: "1",
      manufacturer_name: "ASML Holdings N.V.",
      category_name: "Advanced EUV Lithography Systems & Equipment",
      asset_count: 3,
    }),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tests layout with very long model name, manufacturer name, and description.",
      },
    },
  },
  play: async () => {
    Store.asset.query = mockAssetQuerySuccess;
    const { ServerService } = await import(
      "@/common_lib/services/ServerService"
    );
    ServerService.callGet = fn(async (model: string, path: string) => {
      if (model === "asset" && path === "count") {
        return { success: true, data: 3 } as IJSONAPIType<number>;
      }
      return { success: false, error: "Not Found" };
    });
  },
};
