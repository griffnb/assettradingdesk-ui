import { MessageModel } from "@/models/models/message/model/MessageModel";
import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { OpportunityThreadItem } from "./OpportunityThreadItem";

// Removed unused mockStore

// Create mock opportunity
const mockOpportunity = Store.opportunity.create({
  id: "opp-123",
  buyer_account_id: "buyer-456",
  seller_account_id: "seller-789",
  asset_id: "asset-999",
  buyer_client_name: "John Smith",
});

// Create mock messages
const createMockMessage = (
  id: string,
  body: string,
  isRead: number = 0,
): MessageModel => {
  return Store.message.create({
    id,
    body,
    opportunity_id: mockOpportunity.id,
    asset_id: mockOpportunity.asset_id,
    from_account_id: "buyer-456",
    to_account_id: "seller-789",
    is_read: isRead,
    created_at: dayjs().subtract(2, "hours"),
    updated_at: dayjs().subtract(2, "hours"),
  });
};

const mockMessages: MessageModel[] = [
  createMockMessage(
    "msg-1",
    "Hi, I'm interested in this asset. Is it still available?",
    1,
  ),
  createMockMessage(
    "msg-2",
    "Yes, it's still available. Would you like to schedule a viewing?",
    1,
  ),
  createMockMessage(
    "msg-3",
    "That would be great! I'm available next Tuesday or Wednesday.",
    0,
  ),
];

const mockMessagesUnread: MessageModel[] = [
  createMockMessage(
    "msg-1",
    "Hi, I'm interested in this asset. Is it still available?",
    0,
  ),
  createMockMessage(
    "msg-2",
    "Can you provide more details about the condition?",
    0,
  ),
];

const mockMessagesLongText: MessageModel[] = [
  createMockMessage(
    "msg-1",
    "This is a very long message that should be truncated to demonstrate how the component handles long text content. It should show only the first 60 characters and add ellipsis at the end to indicate there's more content.",
    0,
  ),
];

const meta = {
  title: "Customer/Messages/V2/OpportunityThreadItem",
  component: OpportunityThreadItem,
  argTypes: {
    active: { control: "boolean" },
    unreadCount: { control: "number" },
    onClick: { action: "clicked" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof OpportunityThreadItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opportunity: mockOpportunity,
    messages: mockMessages,
    unreadCount: 1,
    active: false,
    onClick: () => {},
  },
};

export const Active: Story = {
  args: {
    opportunity: mockOpportunity,
    messages: mockMessages,
    unreadCount: 1,
    active: true,
    onClick: () => {},
  },
};

export const Unread: Story = {
  args: {
    opportunity: mockOpportunity,
    messages: mockMessagesUnread,
    unreadCount: 2,
    active: false,
    onClick: () => {},
  },
};

export const UnreadActive: Story = {
  args: {
    opportunity: mockOpportunity,
    messages: mockMessagesUnread,
    unreadCount: 2,
    active: true,
    onClick: () => {},
  },
};

export const Read: Story = {
  args: {
    opportunity: mockOpportunity,
    messages: mockMessages.map((msg) => {
      msg.is_read = 1;
      return msg;
    }),
    unreadCount: 0,
    active: false,
    onClick: () => {},
  },
};

export const LongMessage: Story = {
  args: {
    opportunity: mockOpportunity,
    messages: mockMessagesLongText,
    unreadCount: 1,
    active: false,
    onClick: () => {},
  },
};

export const NoMessages: Story = {
  args: {
    opportunity: mockOpportunity,
    messages: [],
    unreadCount: 0,
    active: false,
    onClick: () => {},
  },
};
