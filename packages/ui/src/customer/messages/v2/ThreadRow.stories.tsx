import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { ThreadRow } from "./ThreadRow";

const meta: Meta<typeof ThreadRow> = {
  title: "Customer/Components/Messages/V2/ThreadRow",
  component: ThreadRow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
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
  const createdAt = dayjs().subtract(hoursAgo, "hours");

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
    thread: Store.message.create({
      id: "thread-1",
      opportunity_id: mockOpportunity.id,
      asset_id: mockAsset.id,
      from_account_id: "buyer-123",
      from_account_name: "Alice Buyer",
      to_account_id: "seller-456",
      to_account_name: "John Seller",
      asset_make_model: `${mockAsset.manufacturer_name} ${mockAsset.model_name}`,
      asset_thumbnail:
        "https://via.placeholder.com/150?text=Applied+Materials+Centura",
      body: mockMessages[mockMessages.length - 1]?.body || "",
      unread_count: 0,
    }),
    account: Store.account.create({
      id: "buyer-123",
      name: "Alice Buyer",
    }),
    onClick: () => console.log("Thread clicked"),
  },
};
