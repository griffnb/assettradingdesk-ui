import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";
import { MemoryRouter } from "react-router";
import { ManufacturersIndex } from "./ManufacturersIndex";

const meta = {
  title: "Customer/Manufacturers/ManufacturersIndex",
  component: ManufacturersIndex,
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
} satisfies Meta<typeof ManufacturersIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create mock manufacturers using the Store
const mockManufacturers = [
  Store.manufacturer.create({
    id: "1",
    name: "ASML",
    slug: "asml",
    description: "Leading manufacturer of photolithography systems for the semiconductor industry. ASML produces advanced extreme ultraviolet (EUV) lithography machines used in cutting-edge chip production.",
    asset_count: 24,
  }),
  Store.manufacturer.create({
    id: "2",
    name: "Applied Materials",
    slug: "applied-materials",
    description: "Global leader in materials engineering solutions for the semiconductor, display, and related industries. Provides manufacturing equipment, services, and software.",
    asset_count: 156,
  }),
  Store.manufacturer.create({
    id: "3",
    name: "Lam Research",
    slug: "lam-research",
    description: "Major supplier of wafer fabrication equipment and services to the semiconductor industry. Specializes in deposition, etch, and clean systems.",
    asset_count: 89,
  }),
  Store.manufacturer.create({
    id: "4",
    name: "KLA Corporation",
    slug: "kla-corporation",
    description: "Leading provider of process control and yield management solutions for the semiconductor and related nanoelectronics industries.",
    asset_count: 67,
  }),
  Store.manufacturer.create({
    id: "5",
    name: "Tokyo Electron",
    slug: "tokyo-electron",
    description: "Japanese manufacturer of semiconductor production equipment and flat panel display production equipment. Offers comprehensive solutions for chip manufacturing.",
    asset_count: 43,
  }),
  Store.manufacturer.create({
    id: "6",
    name: "Screen Holdings",
    slug: "screen-holdings",
    description: "Specialized in semiconductor manufacturing equipment, particularly cleaning and coating systems for wafer processing.",
    asset_count: 31,
  }),
  Store.manufacturer.create({
    id: "7",
    name: "Advantest",
    slug: "advantest",
    description: "World's leading manufacturer of automatic test equipment (ATE) for semiconductors, systems-on-chip (SoC), and other electronic devices.",
    asset_count: 28,
  }),
  Store.manufacturer.create({
    id: "8",
    name: "Teradyne",
    slug: "teradyne",
    description: "Leading supplier of automation equipment for test and industrial applications, including semiconductor testing systems.",
    asset_count: 19,
  }),
  Store.manufacturer.create({
    id: "9",
    name: "Nikon Precision",
    slug: "nikon-precision",
    description: "Producer of precision equipment for semiconductor lithography and metrology applications.",
    asset_count: 0,
  }),
];

// Mock the Store.manufacturer.query method for stories
const mockQuerySuccess = fn(async () => ({
  success: true,
  data: mockManufacturers,
}));

const mockQueryEmpty = fn(async () => ({
  success: true,
  data: [],
}));

const mockQueryError = fn(async () => ({
  success: false,
  error: "Failed to load manufacturers",
}));

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default view showing a grid of manufacturers with asset counts and descriptions.",
      },
    },
  },
  play: async () => {
    // Mock the Store.manufacturer.query method
    Store.manufacturer.query = mockQuerySuccess;
  },
};

export const WithManyManufacturers: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays manufacturers with various asset counts, showing how the layout adapts.",
      },
    },
  },
  play: async () => {
    Store.manufacturer.query = mockQuerySuccess;
  },
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows the empty state when no manufacturers are available.",
      },
    },
  },
  play: async () => {
    Store.manufacturer.query = mockQueryEmpty;
  },
};

export const WithNoAssets: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays manufacturers that have no assets currently listed.",
      },
    },
  },
  play: async () => {
    const noAssetsManufacturers = [
      Store.manufacturer.create({
        id: "1",
        name: "Manufacturer A",
        slug: "manufacturer-a",
        description: "A manufacturer with no assets listed.",
        asset_count: 0,
      }),
      Store.manufacturer.create({
        id: "2",
        name: "Manufacturer B",
        slug: "manufacturer-b",
        description: "Another manufacturer without assets.",
        asset_count: 0,
      }),
    ];

    Store.manufacturer.query = fn(async () => ({
      success: true,
      data: noAssetsManufacturers,
    }));
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows the loading state while manufacturers are being fetched.",
      },
    },
  },
  play: async () => {
    // Mock a slow query that never resolves during the story
    Store.manufacturer.query = fn(async () => {
      return new Promise(() => {}); // Never resolves
    });
  },
};
