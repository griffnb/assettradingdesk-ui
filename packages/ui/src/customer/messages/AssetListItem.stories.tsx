import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AssetListItem } from "./AssetListItem";

const meta = {
  title: "Customer/Messages/AssetListItem",
  component: AssetListItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px] border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AssetListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockThreads = [
  {
    id: "thread-1",
    lastMessageBody: "Confirming helium logistics",
    lastMessageTime: new Date("2025-01-07T10:30:00"),
    unreadCount: 2,
  },
  {
    id: "thread-2",
    lastMessageBody: "Uploaded photo set and BOM",
    lastMessageTime: new Date("2025-01-07T09:15:00"),
    unreadCount: 0,
  },
  {
    id: "thread-3",
    lastMessageBody: "Final draft contract",
    lastMessageTime: new Date("2025-01-06T14:20:00"),
    unreadCount: 1,
  },
];

export const Collapsed: Story = {
  args: {
    assetId: "asset-1",
    assetName: "GE MRI Scanner 3.0T",
    assetInitials: "GM",
    threadCount: 3,
    totalUnread: 3,
    isExpanded: false,
    threads: mockThreads,
    onToggle: () => console.log("Toggle clicked"),
    onThreadSelect: (id) => console.log("Thread selected:", id),
  },
};

export const Expanded: Story = {
  args: {
    assetId: "asset-1",
    assetName: "GE MRI Scanner 3.0T",
    assetInitials: "GM",
    threadCount: 3,
    totalUnread: 3,
    isExpanded: true,
    threads: mockThreads,
    selectedThreadId: "thread-1",
    onToggle: () => console.log("Toggle clicked"),
    onThreadSelect: (id) => console.log("Thread selected:", id),
  },
};

export const NoUnreadMessages: Story = {
  args: {
    assetId: "asset-2",
    assetName: "Siemens CT Scanner",
    assetInitials: "SC",
    threadCount: 2,
    totalUnread: 0,
    isExpanded: false,
    threads: [
      {
        id: "thread-1",
        lastMessageBody: "All questions answered",
        lastMessageTime: new Date("2025-01-05T12:00:00"),
        unreadCount: 0,
      },
      {
        id: "thread-2",
        lastMessageBody: "Installation scheduled",
        lastMessageTime: new Date("2025-01-04T16:30:00"),
        unreadCount: 0,
      },
    ],
    onToggle: () => console.log("Toggle clicked"),
    onThreadSelect: (id) => console.log("Thread selected:", id),
  },
};

export const SingleThread: Story = {
  args: {
    assetId: "asset-3",
    assetName: "X-Ray Machine",
    assetInitials: "XR",
    threadCount: 1,
    totalUnread: 0,
    isExpanded: true,
    threads: [
      {
        id: "thread-1",
        lastMessageBody: "Price negotiation in progress",
        lastMessageTime: new Date(),
        unreadCount: 0,
      },
    ],
    onToggle: () => console.log("Toggle clicked"),
    onThreadSelect: (id) => console.log("Thread selected:", id),
  },
};

export const Interactive = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>();

  return (
    <div className="w-[400px] border">
      <AssetListItem
        assetId="asset-1"
        assetName="GE MRI Scanner 3.0T"
        assetInitials="GM"
        threadCount={3}
        totalUnread={3}
        isExpanded={isExpanded}
        threads={mockThreads}
        selectedThreadId={selectedThreadId}
        onToggle={() => setIsExpanded(!isExpanded)}
        onThreadSelect={(id) => setSelectedThreadId(id)}
      />
    </div>
  );
};
