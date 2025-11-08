import type { Meta, StoryObj } from "@storybook/react";
import { ConversationThreadItem } from "./ConversationThreadItem";

const meta = {
  title: "Customer/Messages/ConversationThreadItem",
  component: ConversationThreadItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConversationThreadItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    threadNumber: 1,
    lastMessageBody: "Confirming helium logistics for the MRI machine",
    lastMessageTime: new Date("2025-01-07T10:30:00"),
    unreadCount: 0,
    isSelected: false,
    onClick: () => console.log("Thread clicked"),
  },
};

export const WithUnreadMessages: Story = {
  args: {
    threadNumber: 2,
    lastMessageBody: "Uploaded photo set and BOM documentation",
    lastMessageTime: new Date("2025-01-07T11:45:00"),
    unreadCount: 3,
    isSelected: false,
    onClick: () => console.log("Thread clicked"),
  },
};

export const Selected: Story = {
  args: {
    threadNumber: 1,
    lastMessageBody: "Final draft contract ready for review",
    lastMessageTime: new Date("2025-01-06T15:20:00"),
    unreadCount: 0,
    isSelected: true,
    onClick: () => console.log("Thread clicked"),
  },
};

export const NoMessages: Story = {
  args: {
    threadNumber: 3,
    lastMessageBody: undefined,
    lastMessageTime: undefined,
    unreadCount: 0,
    isSelected: false,
    onClick: () => console.log("Thread clicked"),
  },
};

export const LongMessagePreview: Story = {
  args: {
    threadNumber: 4,
    lastMessageBody:
      "This is a very long message that should be truncated when displayed in the thread list item to prevent layout issues",
    lastMessageTime: new Date(),
    unreadCount: 1,
    isSelected: false,
    onClick: () => console.log("Thread clicked"),
  },
};
