import { NotificationItem } from "@/common_lib/services/NotificationService";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Notification } from "./Notification";

const meta = {
  title: "Common/Notification/Notification",
  component: Notification,
  argTypes: {
    notification: { control: "object" },
  },
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

const errorNotification: NotificationItem = {
  id: "1",
  type: "error",
  message: "This is an error notification.",
  body: (
    <p>
      With a body im super cool.
      <br /> Multi Lines are great, lots of text here
    </p>
  ),
};

const successNotification: NotificationItem = {
  id: "2",
  type: "success",
  message: "This is a success notification.",
  body: (
    <p>
      With a body im super cool.
      <br /> Multi Lines are great, lots of text here
    </p>
  ),
};

const standardNotification: NotificationItem = {
  id: "2",
  type: "standard",
  message: "This is a success notification.",
  body: (
    <p>
      With a body im super cool.
      <br /> Multi Lines are great, lots of text here
    </p>
  ),
};

export const Error: Story = {
  args: {
    notification: errorNotification,
  },
};

export const Success: Story = {
  args: {
    notification: successNotification,
  },
};

export const Standard: Story = {
  args: {
    notification: standardNotification,
  },
};
