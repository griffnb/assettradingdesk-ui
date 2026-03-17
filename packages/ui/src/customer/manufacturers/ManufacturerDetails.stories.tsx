import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { ManufacturerDetails } from "./ManufacturerDetails";

const meta = {
  title: "Customer/Manufacturers/ManufacturerDetails",
  component: ManufacturerDetails,
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
    manufacturer: {
      description: "The manufacturer model to display",
    },
    models: {
      description: "Array of model instances for this manufacturer",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof ManufacturerDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create mock manufacturer
const mockASML = Store.manufacturer.create({
  id: "1",
  name: "ASML",
  slug: "asml",
  description:
    "ASML is a Dutch company and the leading supplier of photolithography systems for the semiconductor industry. The company manufactures machines for the production of integrated circuits, specializing in extreme ultraviolet (EUV) lithography systems that are essential for producing the most advanced chips. With headquarters in Veldhoven, Netherlands, ASML's technology is critical to semiconductor manufacturing worldwide.",
  asset_count: 24,
});

const mockAppliedMaterials = Store.manufacturer.create({
  id: "2",
  name: "Applied Materials",
  slug: "applied-materials",
  description:
    "Applied Materials is the global leader in materials engineering solutions used to produce virtually every new chip and advanced display in the world. The company's expertise in modifying materials at atomic levels and on an industrial scale enables customers to transform possibilities into reality. Applied Materials delivers innovations that make possible the technologies shaping the future.",
  asset_count: 156,
});

// Create mock models for ASML
const mockASMLModels = [
  Store.model.create({
    id: "1",
    name: "TWINSCAN NXE:3400C",
    slug: "twinscan-nxe-3400c",
    description:
      "High-volume EUV lithography system delivering superior imaging performance and productivity for advanced semiconductor manufacturing at 7nm and beyond.",
    manufacturer_id: "1",
    manufacturer_name: "ASML",
    category_name: "Lithography Systems",
    asset_count: 8,
  }),
  Store.model.create({
    id: "2",
    name: "TWINSCAN NXT:2000i",
    slug: "twinscan-nxt-2000i",
    description:
      "ArF immersion lithography system offering excellent imaging and overlay performance for advanced memory and logic applications.",
    manufacturer_id: "1",
    manufacturer_name: "ASML",
    category_name: "Lithography Systems",
    asset_count: 12,
  }),
  Store.model.create({
    id: "3",
    name: "TWINSCAN XT:1950i",
    slug: "twinscan-xt-1950i",
    description:
      "Dual-stage immersion scanner providing high productivity and excellent imaging performance for critical layers.",
    manufacturer_id: "1",
    manufacturer_name: "ASML",
    category_name: "Lithography Systems",
    asset_count: 4,
  }),
];

// Create models for Applied Materials with more variety
const mockAppliedMaterialsModels = [
  Store.model.create({
    id: "4",
    name: "Centura Ultimo",
    slug: "centura-ultimo",
    description:
      "Advanced metal deposition platform for critical interconnect applications in leading-edge logic and memory devices.",
    manufacturer_id: "2",
    manufacturer_name: "Applied Materials",
    category_name: "Deposition Equipment",
    asset_count: 45,
  }),
  Store.model.create({
    id: "5",
    name: "Endura",
    slug: "endura",
    description:
      "Integrated PVD system for metal barrier, seed, and fill applications in advanced interconnect manufacturing.",
    manufacturer_id: "2",
    manufacturer_name: "Applied Materials",
    category_name: "Deposition Equipment",
    asset_count: 38,
  }),
  Store.model.create({
    id: "6",
    name: "Producer SE",
    slug: "producer-se",
    description:
      "High-productivity PECVD system for dielectric film deposition in display and solar applications.",
    manufacturer_id: "2",
    manufacturer_name: "Applied Materials",
    category_name: "CVD Equipment",
    asset_count: 29,
  }),
  Store.model.create({
    id: "7",
    name: "Reflexion LK Prime",
    slug: "reflexion-lk-prime",
    description:
      "CMP system delivering superior wafer uniformity and defectivity performance for advanced technology nodes.",
    manufacturer_id: "2",
    manufacturer_name: "Applied Materials",
    category_name: "CMP Equipment",
    asset_count: 24,
  }),
  Store.model.create({
    id: "8",
    name: "Applied Centura AdvantEdge Mesa",
    slug: "centura-advantedge-mesa",
    description:
      "Etch system for advanced mesa etch applications in compound semiconductor device manufacturing.",
    manufacturer_id: "2",
    manufacturer_name: "Applied Materials",
    category_name: "Etch Equipment",
    asset_count: 20,
  }),
];

// Model with no assets
const mockModelNoAssets = Store.model.create({
  id: "9",
  name: "TWINSCAN NXE:3600D",
  slug: "twinscan-nxe-3600d",
  description:
    "Latest generation EUV lithography system with enhanced productivity and imaging capabilities.",
  manufacturer_id: "1",
  manufacturer_name: "ASML",
  category_name: "Lithography Systems",
  asset_count: 0,
});

export const Default: Story = {
  args: {
    manufacturer: mockASML,
    models: mockASMLModels,
  },
  parameters: {
    docs: {
      description: {
        story: "Default view showing manufacturer details with available models and asset counts.",
      },
    },
  },
};

export const WithManyModels: Story = {
  args: {
    manufacturer: mockAppliedMaterials,
    models: mockAppliedMaterialsModels,
  },
  parameters: {
    docs: {
      description: {
        story: "Displays a manufacturer with many models showing how the grid layout adapts.",
      },
    },
  },
};

export const WithNoModels: Story = {
  args: {
    manufacturer: Store.manufacturer.create({
      id: "3",
      name: "Nikon Precision",
      slug: "nikon-precision",
      description:
        "Nikon Precision Equipment focuses on semiconductor lithography equipment and FPD (Flat Panel Display) lithography systems. The company provides advanced optical systems for semiconductor device manufacturing.",
      asset_count: 0,
    }),
    models: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the empty state when a manufacturer has no models available.",
      },
    },
  },
};

export const WithModelsButNoAssets: Story = {
  args: {
    manufacturer: mockASML,
    models: [mockModelNoAssets],
  },
  parameters: {
    docs: {
      description: {
        story: "Displays models that exist but have no assets currently listed.",
      },
    },
  },
};

export const WithShortDescription: Story = {
  args: {
    manufacturer: Store.manufacturer.create({
      id: "4",
      name: "KLA Corporation",
      slug: "kla-corporation",
      description: "Process control and yield management solutions provider.",
      asset_count: 67,
    }),
    models: [
      Store.model.create({
        id: "10",
        name: "Archer 700",
        slug: "archer-700",
        description: "Overlay metrology system for advanced semiconductor manufacturing.",
        manufacturer_id: "4",
        manufacturer_name: "KLA Corporation",
        category_name: "Metrology Equipment",
        asset_count: 15,
      }),
      Store.model.create({
        id: "11",
        name: "8835",
        slug: "8835",
        description: "Wafer inspection system for defect detection.",
        manufacturer_id: "4",
        manufacturer_name: "KLA Corporation",
        category_name: "Inspection Equipment",
        asset_count: 22,
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Manufacturer with a shorter description showing layout flexibility.",
      },
    },
  },
};

export const WithLongModelNames: Story = {
  args: {
    manufacturer: mockASML,
    models: [
      Store.model.create({
        id: "12",
        name: "TWINSCAN NXE:3400C Advanced High-NA Extreme Ultraviolet Lithography System",
        slug: "twinscan-nxe-3400c-advanced",
        description:
          "This is an extremely advanced photolithography system featuring cutting-edge extreme ultraviolet technology with high numerical aperture optics for next-generation semiconductor manufacturing at 3nm and below process nodes.",
        manufacturer_id: "1",
        manufacturer_name: "ASML",
        category_name: "Advanced EUV Lithography Systems",
        asset_count: 3,
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Tests layout with long model names and descriptions to ensure proper text truncation.",
      },
    },
  },
};

export const WithMixedAssetCounts: Story = {
  args: {
    manufacturer: mockASML,
    models: [
      ...mockASMLModels,
      Store.model.create({
        id: "13",
        name: "TWINSCAN NXT:1980Di",
        slug: "twinscan-nxt-1980di",
        description: "ArF immersion scanner for high-volume manufacturing.",
        manufacturer_id: "1",
        manufacturer_name: "ASML",
        category_name: "Lithography Systems",
        asset_count: 156,
      }),
      mockModelNoAssets,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Shows models with varying asset counts including very high counts and zero.",
      },
    },
  },
};
