import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ReplyBox } from "./ReplyBox";

const meta = {
  title: "Customer/Messages/ReplyBox",
  component: ReplyBox,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReplyBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Type your reply...",
    helperText: "Reply to buyer inquiry",
    disabled: false,
    sending: false,
    onChange: (val) => console.log("Changed:", val),
    onSend: () => console.log("Send clicked"),
  },
};

export const WithText: Story = {
  args: {
    value: "Thank you for your inquiry. The equipment is in excellent condition.",
    placeholder: "Type your reply...",
    helperText: "Reply to buyer inquiry",
    disabled: false,
    sending: false,
    onChange: (val) => console.log("Changed:", val),
    onSend: () => console.log("Send clicked"),
  },
};

export const Sending: Story = {
  args: {
    value: "This message is being sent...",
    placeholder: "Type your reply...",
    helperText: "Reply to buyer inquiry",
    disabled: false,
    sending: true,
    onChange: (val) => console.log("Changed:", val),
    onSend: () => console.log("Send clicked"),
  },
};

export const Disabled: Story = {
  args: {
    value: "",
    placeholder: "Type your reply...",
    helperText: "Reply to buyer inquiry",
    disabled: true,
    sending: false,
    onChange: (val) => console.log("Changed:", val),
    onSend: () => console.log("Send clicked"),
  },
};

export const CustomHelperText: Story = {
  args: {
    value: "",
    placeholder: "Type your message...",
    helperText: "Messages are visible to all parties",
    disabled: false,
    sending: false,
    onChange: (val) => console.log("Changed:", val),
    onSend: () => console.log("Send clicked"),
  },
};

export const Interactive = () => {
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      console.log("Sent:", value);
      setValue("");
      setSending(false);
    }, 1500);
  };

  return (
    <div className="w-[600px]">
      <ReplyBox
        value={value}
        placeholder="Type your reply..."
        helperText="Reply to buyer inquiry"
        sending={sending}
        onChange={setValue}
        onSend={handleSend}
      />
    </div>
  );
};
