import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RequestListItem } from "./RequestListItem";

const meta = {
  title: "Customer/Messages/RequestListItem",
  component: RequestListItem,
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
} satisfies Meta<typeof RequestListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAssets = [
  {
    id: "asset-1",
    name: "GE MRI Scanner 3.0T",
    initials: "GM",
    lastMessageBody: "Thanks for the information",
    lastMessageTime: new Date("2025-01-07T10:30:00"),
  },
  {
    id: "asset-2",
    name: "Siemens CT Scanner",
    initials: "SC",
    lastMessageBody: "Can we schedule a viewing?",
    lastMessageTime: new Date("2025-01-07T09:15:00"),
  },
];

export const Collapsed: Story = {
  args: {
    requestId: "req-1",
    requestInitials: "R1",
    displayId: "12345678",
    messageCount: 5,
    unreadCount: 2,
    isExpanded: false,
    hasAssets: true,
    assets: mockAssets,
    onToggle: () => console.log("Toggle clicked"),
    onAssetSelect: (id) => console.log("Asset selected:", id),
  },
};

export const Expanded: Story = {
  args: {
    requestId: "req-1",
    requestInitials: "R1",
    displayId: "12345678",
    messageCount: 5,
    unreadCount: 2,
    isExpanded: true,
    hasAssets: true,
    assets: mockAssets,
    selectedAssetId: "asset-1",
    onToggle: () => console.log("Toggle clicked"),
    onAssetSelect: (id) => console.log("Asset selected:", id),
  },
};

export const NoUnreadMessages: Story = {
  args: {
    requestId: "req-2",
    requestInitials: "R2",
    displayId: "87654321",
    messageCount: 3,
    unreadCount: 0,
    isExpanded: false,
    hasAssets: true,
    assets: [
      {
        id: "asset-1",
        name: "X-Ray Machine",
        initials: "XR",
        lastMessageBody: "Installation complete",
        lastMessageTime: new Date("2025-01-05T14:00:00"),
      },
    ],
    onToggle: () => console.log("Toggle clicked"),
    onAssetSelect: (id) => console.log("Asset selected:", id),
  },
};

export const NoAssets: Story = {
  args: {
    requestId: "req-3",
    requestInitials: "R3",
    displayId: "11111111",
    messageCount: 1,
    unreadCount: 0,
    isExpanded: false,
    hasAssets: false,
    assets: [],
    onToggle: () => console.log("Toggle clicked"),
    onAssetSelect: (id) => console.log("Asset selected:", id),
  },
};

export const Interactive = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | undefined>();

  return (
    <div className="w-[400px] border">
      <RequestListItem
        requestId="req-1"
        requestInitials="R1"
        displayId="12345678"
        messageCount={5}
        unreadCount={2}
        isExpanded={isExpanded}
        hasAssets={true}
        assets={mockAssets}
        selectedAssetId={selectedAssetId}
        onToggle={() => setIsExpanded(!isExpanded)}
        onAssetSelect={(id) => setSelectedAssetId(id)}
      />
    </div>
  );
};
