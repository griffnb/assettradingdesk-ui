import type { Meta, StoryObj } from "@storybook/react";
import { MessageBubble } from "./MessageBubble";

const meta = {
  title: "Customer/Messages/MessageBubble",
  component: MessageBubble,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "sender", "receiver"],
    },
  },
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    senderName: "John Doe",
    body: "Sharing the inspection packet – coil calibration looks great.",
    timestamp: new Date("2025-01-07T09:12:00"),
    variant: "default",
  },
};

export const SenderVariant: Story = {
  args: {
    senderName: "Broker",
    body: "Yes. Seller will hold rigging crew through Feb 20 if deposit lands by Nov 5.",
    timestamp: new Date("2025-01-07T09:24:00"),
    variant: "sender",
  },
};

export const ReceiverVariant: Story = {
  args: {
    senderName: "Buyer",
    body: "Thanks! Can we lock install support if we wire 30% upfront?",
    timestamp: new Date("2025-01-07T09:18:00"),
    variant: "receiver",
  },
};

export const LongMessage: Story = {
  args: {
    senderName: "Technical Expert",
    body: "After reviewing the equipment specifications and conducting a thorough inspection, I can confirm that all components meet the required standards. The calibration certificates are up to date, and the machine has been properly maintained according to manufacturer guidelines. I recommend proceeding with the purchase.",
    timestamp: new Date(),
    variant: "default",
  },
};

export const NoTimestamp: Story = {
  args: {
    senderName: "Anonymous",
    body: "Message without timestamp",
    timestamp: null,
    variant: "default",
  },
};
