import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { MessageBubble } from "./MessageBubble";

const meta: Meta<typeof MessageBubble> = {
  title: "Customer/Components/Messages/V2/MessageBubble",
  component: MessageBubble,
  argTypes: {
    message: {
      description: "MessageModel instance",
    },
    isOwnMessage: {
      description: "Whether the message was sent by the current user",
      control: "boolean",
    },
    senderName: {
      description: "Display name of the message sender",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ReceivedMessage: Story = {
  args: {
    message: Store.message.create({
      id: "1",
      body: "Hi, I'm interested in this asset. Can you provide more details about its condition?",
      created_at: dayjs("2024-12-04T10:30:00"),
      from_account_id: "buyer-123",
      to_account_id: "seller-456",
      is_read: 1,
    }),
    isOwnMessage: false,
    senderName: "John Smith",
  },
};

export const SentMessage: Story = {
  args: {
    message: Store.message.create({
      id: "2",
      body: "Hello! The asset is in excellent condition. Would you like to schedule a viewing?",
      created_at: dayjs("2024-12-04T10:35:00"),
      from_account_id: "seller-456",
      to_account_id: "buyer-123",
      is_read: 1,
    }),
    isOwnMessage: true,
    senderName: "You",
  },
};

export const LongMessage: Story = {
  args: {
    message: Store.message.create({
      id: "3",
      body: "Thank you for your interest! This asset has been well-maintained over the years. It includes all original documentation and has undergone regular service intervals. The condition is pristine, with minimal wear and tear. We can arrange a viewing at your convenience, either at our facility or we can transport it to a location of your choice for inspection. Please let me know what works best for you.",
      created_at: dayjs("2024-12-04T11:00:00"),
      from_account_id: "seller-456",
      to_account_id: "buyer-123",
      is_read: 0,
    }),
    isOwnMessage: false,
    senderName: "Jane Doe",
  },
};

export const MessageWithLineBreaks: Story = {
  args: {
    message: Store.message.create({
      id: "4",
      body: "Here are the key details:\n\n1. Year: 2020\n2. Hours: 500\n3. Location: New York\n4. Price: $250,000\n\nLet me know if you need any additional information.",
      created_at: dayjs("2024-12-04T14:20:00"),
      from_account_id: "seller-456",
      to_account_id: "buyer-123",
      is_read: 1,
    }),
    isOwnMessage: true,
    senderName: "You",
  },
};
