import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { RequestThreadItem } from "./RequestThreadItem";

const meta: Meta<typeof RequestThreadItem> = {
  title: "Customer/Components/Messages/V2/RequestThreadItem",
  component: RequestThreadItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    opportunity: {
      description: "OpportunityModel instance",
    },
    asset: {
      description: "AssetModel instance with manufacturer and model details",
    },
    messages: {
      description: "Array of MessageModel instances in the conversation",
    },
    unreadCount: {
      description: "Number of unread messages",
      control: "number",
    },
    active: {
      description: "Whether this thread is currently active/selected",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create mock asset
const mockAsset = Store.asset.create({
  id: "asset-1",
  manufacturer_name: "Applied Materials",
  model_name: "Centura",
  year: 2018,
  location: "San Jose, CA",
  price: 450000,
});

// Create mock opportunity
const mockOpportunity = Store.opportunity.create({
  id: "opp-1",
  asset_id: "asset-1",
  buyer_account_id: "buyer-123",
  seller_account_id: "seller-456",
});

// Create mock messages
const createMockMessage = (id: string, body: string, hoursAgo: number = 2) => {
  const createdAt = dayjs().subtract(hoursAgo, 'hours');

  return Store.message.create({
    id,
    body,
    opportunity_id: "opp-1",
    asset_id: "asset-1",
    from_account_id: "buyer-123",
    to_account_id: "seller-456",
    is_read: 1,
    created_at: createdAt,
    updated_at: createdAt,
  });
};

const mockMessages = [
  createMockMessage(
    "msg-1",
    "Hi, I'm interested in this equipment. Is it still available?",
    48,
  ),
  createMockMessage(
    "msg-2",
    "Yes, it's available. Would you like to schedule an inspection?",
    24,
  ),
  createMockMessage(
    "msg-3",
    "That would be great. I'm available next week.",
    2,
  ),
];

export const Default: Story = {
  args: {
    opportunity: mockOpportunity,
    asset: mockAsset,
    messages: mockMessages,
    unreadCount: 0,
    active: false,
    onClick: () => console.log("Thread clicked"),
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    active: true,
  },
};

export const WithUnread: Story = {
  args: {
    ...Default.args,
    unreadCount: 2,
  },
};

export const ActiveWithUnread: Story = {
  args: {
    ...Default.args,
    active: true,
    unreadCount: 1,
  },
};

export const NoMessages: Story = {
  args: {
    ...Default.args,
    messages: [],
    unreadCount: 0,
  },
};

export const LongAssetName: Story = {
  args: {
    ...Default.args,
    asset: Store.asset.create({
      id: "asset-2",
      manufacturer_name: "Tokyo Electron Limited",
      model_name: "Clean Track Lithius Pro-i with Extended Wafer Handler",
      year: 2020,
      location: "Portland, Oregon",
    }),
  },
};

export const LongMessagePreview: Story = {
  args: {
    ...Default.args,
    messages: [
      createMockMessage(
        "msg-long",
        "This is a very long message that should be truncated when displayed in the preview. It contains a lot of information about the asset and the buyer's requirements for the equipment including detailed specifications and delivery timeline.",
        1,
      ),
    ],
  },
};

export const MultipleThreads: Story = {
  render: () => {
    const handleClick = (id: string | null) =>
      console.log(`Clicked thread ${id}`);

    const threads = [
      {
        opportunity: mockOpportunity,
        asset: mockAsset,
        messages: mockMessages,
        unreadCount: 2,
        active: false,
      },
      {
        opportunity: Store.opportunity.create({
          id: "opp-2",
          asset_id: "asset-2",
          buyer_account_id: "buyer-123",
          seller_account_id: "seller-456",
        }),
        asset: Store.asset.create({
          id: "asset-2",
          manufacturer_name: "LAM Research",
          model_name: "2300 Kiyo",
          year: 2019,
          location: "Austin, TX",
        }),
        messages: [
          createMockMessage("msg-4", "Is this equipment available?", 12),
        ],
        unreadCount: 0,
        active: true,
      },
      {
        opportunity: Store.opportunity.create({
          id: "opp-3",
          asset_id: "asset-3",
          buyer_account_id: "buyer-123",
          seller_account_id: "seller-456",
        }),
        asset: Store.asset.create({
          id: "asset-3",
          manufacturer_name: "KLA",
          model_name: "Surfscan SP5",
          year: 2021,
          location: "Milpitas, CA",
        }),
        messages: [],
        unreadCount: 1,
        active: false,
      },
    ];

    return (
      <div className="w-[440px]">
        {threads.map((thread) => (
          <RequestThreadItem
            key={thread.opportunity.id}
            opportunity={thread.opportunity}
            asset={thread.asset}
            messages={thread.messages}
            unreadCount={thread.unreadCount}
            active={thread.active}
            onClick={() => handleClick(thread.opportunity.id)}
          />
        ))}
      </div>
    );
  },
};
