import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MessageThreadPanel } from "./MessageThreadPanel";

const meta = {
  title: "Customer/Messages/MessageThreadPanel",
  component: MessageThreadPanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[700px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageThreadPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMessages = [
  {
    id: "msg-1",
    senderName: "John Broker",
    body: "Sharing the inspection packet – coil calibration looks great.",
    timestamp: new Date("2025-01-07T09:12:00"),
  },
  {
    id: "msg-2",
    senderName: "Alice Buyer",
    body: "Thanks! Can we lock install support if we wire 30% upfront?",
    timestamp: new Date("2025-01-07T09:18:00"),
  },
  {
    id: "msg-3",
    senderName: "John Broker",
    body: "Yes. Seller will hold rigging crew through Feb 20 if deposit lands by Nov 5.",
    timestamp: new Date("2025-01-07T09:24:00"),
  },
];

export const EmptyState: Story = {
  args: {
    title: "Select a conversation",
    messages: [],
    showReplyBox: false,
    emptyStateText: "Select a conversation to view messages",
  },
};

export const WithMessages: Story = {
  args: {
    title: "GE MRI Scanner 3.0T",
    subtitle: "Opportunity OPP-1182",
    messageCount: 3,
    messages: mockMessages,
    showReplyBox: false,
  },
};

export const WithReplyBox: Story = {
  args: {
    title: "GE MRI Scanner 3.0T",
    subtitle: "Opportunity OPP-1182",
    messageCount: 3,
    messages: mockMessages,
    showReplyBox: true,
    replyValue: "",
    replyPlaceholder: "Type your reply...",
    replyHelperText: "Reply to buyer inquiry",
    onReplyChange: (val) => console.log("Reply changed:", val),
    onReplySend: () => console.log("Send clicked"),
  },
};

export const WithReplyText: Story = {
  args: {
    title: "GE MRI Scanner 3.0T",
    subtitle: "Opportunity OPP-1182",
    messageCount: 3,
    messages: mockMessages,
    showReplyBox: true,
    replyValue: "I'll get back to you with the installation details soon.",
    replyPlaceholder: "Type your reply...",
    replyHelperText: "Reply to buyer inquiry",
    onReplyChange: (val) => console.log("Reply changed:", val),
    onReplySend: () => console.log("Send clicked"),
  },
};

export const Sending: Story = {
  args: {
    title: "GE MRI Scanner 3.0T",
    subtitle: "Opportunity OPP-1182",
    messageCount: 3,
    messages: mockMessages,
    showReplyBox: true,
    replyValue: "Sending this message...",
    sending: true,
    onReplyChange: (val) => console.log("Reply changed:", val),
    onReplySend: () => console.log("Send clicked"),
  },
};

export const LongConversation: Story = {
  args: {
    title: "Siemens CT Scanner",
    subtitle: "Request REQ-5678",
    messageCount: 8,
    messages: [
      ...mockMessages,
      {
        id: "msg-4",
        senderName: "Alice Buyer",
        body: "What about warranty coverage?",
        timestamp: new Date("2025-01-07T10:15:00"),
      },
      {
        id: "msg-5",
        senderName: "John Broker",
        body: "Full warranty for 2 years, parts and labor included.",
        timestamp: new Date("2025-01-07T10:30:00"),
      },
      {
        id: "msg-6",
        senderName: "Alice Buyer",
        body: "Perfect. Can you send over the contract?",
        timestamp: new Date("2025-01-07T11:00:00"),
      },
      {
        id: "msg-7",
        senderName: "John Broker",
        body: "Contract attached. Please review and let me know if you have any questions.",
        timestamp: new Date("2025-01-07T11:15:00"),
      },
      {
        id: "msg-8",
        senderName: "Alice Buyer",
        body: "Looks good, we'll proceed with the purchase.",
        timestamp: new Date("2025-01-07T12:00:00"),
      },
    ],
    showReplyBox: true,
    replyValue: "",
    onReplyChange: (val) => console.log("Reply changed:", val),
    onReplySend: () => console.log("Send clicked"),
  },
};

export const Interactive = () => {
  const [replyValue, setReplyValue] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (!replyValue.trim()) return;

    setSending(true);
    setTimeout(() => {
      setMessages([
        ...messages,
        {
          id: `msg-${messages.length + 1}`,
          senderName: "You",
          body: replyValue,
          timestamp: new Date(),
        },
      ]);
      setReplyValue("");
      setSending(false);
    }, 1000);
  };

  return (
    <div className="w-[700px]">
      <MessageThreadPanel
        title="GE MRI Scanner 3.0T"
        subtitle="Opportunity OPP-1182"
        messageCount={messages.length}
        messages={messages}
        showReplyBox={true}
        replyValue={replyValue}
        sending={sending}
        onReplyChange={setReplyValue}
        onReplySend={handleSend}
      />
    </div>
  );
};
