import type { Meta, StoryObj } from "@storybook/react";
import { SimpleModal } from "./SimpleModal";

const meta = {
  title: "Common/Modal/SimpleModal",
  component: SimpleModal,
  argTypes: {
    title: { control: "text" },
    closeHandler: { action: "closed" },
    children: { control: "text" },
  },
} satisfies Meta<typeof SimpleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default-modal",
    title: "Default Modal",
    children: "This is the content of the modal.",
  },
};

export const WithCustomTitle: Story = {
  args: {
    id: "custom-title-modal",
    title: "Custom Title Modal",
    children: "This is the content of the modal.",
  },
};
