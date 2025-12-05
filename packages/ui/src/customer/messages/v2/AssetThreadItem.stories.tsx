import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { useState } from "react";
import { AssetThreadItem } from "./AssetThreadItem";

const meta = {
  title: "Customer/Messages/V2/AssetThreadItem",
  component: AssetThreadItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[440px] border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AssetThreadItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create mock asset
const createMockAsset = (overrides?: Partial<AssetModel>): AssetModel => {
  return Store.asset.create({
    id: "asset-1",
    manufacturer_name: "GE Healthcare",
    model_name: "Discovery MR750",
    year: 2018,
    price: 1250000,
    location: "Boston, MA",
    thumbnail: "https://placehold.co/100x100/e2e8f0/64748b?text=MRI",
    asset_files: [],
    ...overrides,
  });
};

// Create mock opportunity
const createMockOpportunity = (
  id: string,
  buyerAccountId: string,
): OpportunityModel => {
  return Store.opportunity.create({
    id,
    buyer_account_id: buyerAccountId,
    asset_id: "asset-1",
  });
};

// Create mock message
const createMockMessage = (
  id: string,
  body: string,
  updatedAt: dayjs.Dayjs,
): MessageModel => {
  return Store.message.create({
    id,
    body,
    updated_at: updatedAt,
    opportunity_id: "opp-1",
    asset_id: "asset-1",
  });
};

const mockOpportunities = [
  {
    opportunity: createMockOpportunity("opp-1", "buyer-123"),
    messages: [
      createMockMessage(
        "msg-1",
        "Hi, I'm interested in this MRI scanner. Can you provide more details about the helium logistics?",
        dayjs("2025-01-07T10:30:00"),
      ),
      createMockMessage(
        "msg-2",
        "Sure, we can arrange helium delivery. The system is currently filled.",
        dayjs("2025-01-07T11:15:00"),
      ),
      createMockMessage(
        "msg-3",
        "Perfect! Can we schedule a site inspection?",
        dayjs("2025-01-07T14:20:00"),
      ),
    ],
    unreadCount: 2,
  },
  {
    opportunity: createMockOpportunity("opp-2", "buyer-456"),
    messages: [
      createMockMessage(
        "msg-4",
        "What's your best price for this unit?",
        dayjs("2025-01-06T09:00:00"),
      ),
      createMockMessage(
        "msg-5",
        "We can offer $1.2M with installation included.",
        dayjs("2025-01-06T10:30:00"),
      ),
    ],
    unreadCount: 0,
  },
  {
    opportunity: createMockOpportunity("opp-3", "buyer-789"),
    messages: [
      createMockMessage(
        "msg-6",
        "Is the service contract transferable?",
        dayjs("2025-01-05T15:45:00"),
      ),
    ],
    unreadCount: 1,
  },
];

export const Collapsed: Story = {
  args: {
    asset: createMockAsset(),
    opportunities: mockOpportunities,
    activeOpportunityId: null,
    onSelectOpportunity: (id) => console.log("Selected opportunity:", id),
  },
};

export const ExpandedWithActive = () => {
  const [activeOpportunityId, setActiveOpportunityId] = useState<string | null>(
    "opp-1",
  );

  return (
    <div className="w-[440px] border">
      <AssetThreadItem
        asset={createMockAsset()}
        opportunities={mockOpportunities}
        activeOpportunityId={activeOpportunityId}
        onSelectOpportunity={setActiveOpportunityId}
      />
    </div>
  );
};

export const NoUnreadMessages: Story = {
  args: {
    asset: createMockAsset({
      manufacturer_name: "Siemens",
      model_name: "Biograph mCT",
      year: 2020,
      price: 850000,
      location: "San Francisco, CA",
      thumbnail: "https://placehold.co/100x100/dbeafe/3b82f6?text=CT",
    }),
    opportunities: [
      {
        opportunity: createMockOpportunity("opp-4", "buyer-111"),
        messages: [
          createMockMessage(
            "msg-7",
            "All questions answered, thank you!",
            dayjs("2025-01-03T12:00:00"),
          ),
        ],
        unreadCount: 0,
      },
      {
        opportunity: createMockOpportunity("opp-5", "buyer-222"),
        messages: [
          createMockMessage(
            "msg-8",
            "Installation completed successfully.",
            dayjs("2025-01-02T16:30:00"),
          ),
        ],
        unreadCount: 0,
      },
    ],
    activeOpportunityId: null,
    onSelectOpportunity: (id) => console.log("Selected opportunity:", id),
  },
};

export const SingleConversation: Story = {
  args: {
    asset: createMockAsset({
      manufacturer_name: "Philips",
      model_name: "Ingenia 3.0T",
      year: 2019,
      price: 0,
      location: "New York, NY",
      thumbnail: "https://placehold.co/100x100/fef3c7/f59e0b?text=MRI",
    }),
    opportunities: [
      {
        opportunity: createMockOpportunity("opp-6", "buyer-333"),
        messages: [
          createMockMessage(
            "msg-9",
            "Interested in discussing financing options.",
            dayjs(),
          ),
        ],
        unreadCount: 1,
      },
    ],
    activeOpportunityId: null,
    onSelectOpportunity: (id) => console.log("Selected opportunity:", id),
  },
};

export const ManyConversations: Story = {
  args: {
    asset: createMockAsset(),
    opportunities: [
      ...mockOpportunities,
      {
        opportunity: createMockOpportunity("opp-7", "buyer-444"),
        messages: [
          createMockMessage(
            "msg-10",
            "Fourth inquiry about availability",
            dayjs(),
          ),
        ],
        unreadCount: 3,
      },
      {
        opportunity: createMockOpportunity("opp-8", "buyer-555"),
        messages: [
          createMockMessage("msg-11", "Fifth inquiry about shipping", dayjs()),
        ],
        unreadCount: 0,
      },
    ],
    activeOpportunityId: null,
    onSelectOpportunity: (id) => console.log("Selected opportunity:", id),
  },
};

export const Interactive = () => {
  const [activeOpportunityId, setActiveOpportunityId] = useState<string | null>(
    null,
  );

  return (
    <div className="w-[440px] space-y-4 border">
      <AssetThreadItem
        asset={createMockAsset()}
        opportunities={mockOpportunities}
        activeOpportunityId={activeOpportunityId}
        onSelectOpportunity={setActiveOpportunityId}
      />
      <AssetThreadItem
        asset={createMockAsset({
          id: "asset-2",
          manufacturer_name: "Siemens",
          model_name: "Biograph mCT",
          year: 2020,
          price: 850000,
          thumbnail: "https://placehold.co/100x100/dbeafe/3b82f6?text=CT",
        })}
        opportunities={[
          {
            opportunity: createMockOpportunity("opp-9", "buyer-666"),
            messages: [
              createMockMessage(
                "msg-12",
                "Different asset conversation",
                dayjs(),
              ),
            ],
            unreadCount: 1,
          },
        ]}
        activeOpportunityId={activeOpportunityId}
        onSelectOpportunity={setActiveOpportunityId}
      />
    </div>
  );
};
