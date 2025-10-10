import type { Meta, StoryObj } from "@storybook/react";
import { InlineNotification } from "./InlineNotification";

// Meta configuration
const meta = {
  title: "Common/InlineNotification",
  component: InlineNotification,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error"],
    },
    onClose: { action: "closed" },
  },
} satisfies Meta<typeof InlineNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default InlineNotification with Primary variant
export const Default: Story = {
  args: {
    variant: "primary",
    title: "Primary Notification",
    message: "This is a message for a primary notification.",
    icon: <i className="u u-error-circle" />,
  },
};

// Success variant example
export const Success: Story = {
  args: {
    variant: "success",
    title: "Success Notification",
    message: "Everything went smoothly. Success!",
    icon: <i className="u u-error-circle" />,
  },
};

// Error variant example
export const Error: Story = {
  args: {
    variant: "error",
    title: "Error Notification",
    message: "Oops! Something went wrong.",
    icon: <i className="u u-error-circle" />,
  },
};

// Warning variant example
export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning Notification",
    message: "This is a warning. Be careful.",
    icon: <i className="u u-error-circle" />,
  },
};

// Secondary variant example
export const Secondary: Story = {
  args: {
    variant: "secondary",
    title: "Secondary Notification",
    message: "This is a secondary notification type.",
    icon: <i className="u u-error-circle" />,
  },
};
