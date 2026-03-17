import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReplyBox } from "./ReplyBox";

const meta: Meta<typeof ReplyBox> = {
  title: "Customer/Messages/V2/ReplyBox",
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
  argTypes: {
    onSubmit: { action: "submitted" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async (body: string) => {
      console.log("Submitting:", body);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitted successfully");
    },
    placeholder: "Type your message...",
    disabled: false,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    onSubmit: async (body: string) => {
      console.log("Submitting:", body);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    placeholder: "Type your reply to the seller...",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    onSubmit: async (body: string) => {
      console.log("Submitting:", body);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    placeholder: "Type your message...",
    disabled: true,
  },
};

export const SlowSubmit: Story = {
  args: {
    onSubmit: async (body: string) => {
      console.log("Submitting:", body);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Submitted after delay");
    },
    placeholder: "Type your message...",
    disabled: false,
  },
};

export const WithError: Story = {
  args: {
    onSubmit: async (body: string) => {
      console.log("Submitting:", body);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error("Failed to send message");
    },
    placeholder: "Type your message...",
    disabled: false,
  },
};
