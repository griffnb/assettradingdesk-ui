import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfirmModal } from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: "Common/Components/Modal/ConfirmModal",
  component: ConfirmModal,
  argTypes: {
    title: { control: "text" },
    text: { control: "text" },
    confirmText: { control: "text" },
    cancelText: { control: "text" },
    onConfirm: { action: "confirmed" },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Confirm Action",
    text: "Are you sure you want to proceed with this action?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: () => console.log("Confirmed"),
    onCancel: () => console.log("Cancelled"),
  },
};

export const WithoutTitle: Story = {
  args: {
    text: "Are you sure you want to delete this item?",
    confirmText: "Delete",
    cancelText: "Cancel",
    onConfirm: () => console.log("Confirmed"),
    onCancel: () => console.log("Cancelled"),
  },
};

export const WithHTMLContent: Story = {
  args: {
    title: "Terms & Conditions",
    text: (
      <div className="max-h-60 overflow-y-auto">
        <p className="mb-2">Please review the following terms carefully:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>You agree to use the service responsibly</li>
          <li>You will not share your credentials with others</li>
          <li>All data is subject to our privacy policy</li>
          <li>
            We reserve the right to terminate accounts that violate our terms
          </li>
        </ul>
        <p className="mt-2">Click confirm to agree to these terms.</p>
      </div>
    ),
    confirmText: "I Agree",
    cancelText: "Decline",
    onConfirm: () => console.log("Terms accepted"),
    onCancel: () => console.log("Terms declined"),
  },
};

export const WithoutCancel: Story = {
  args: {
    text: "Are you sure you want to delete this item?",
    confirmText: "Delete",
    onConfirm: () => console.log("Confirmed"),
  },
};

export const WithoutCancelAndVariant: Story = {
  args: {
    text: "Are you sure you want to delete this item?",
    confirmText: "Delete",
    confirmVariant: "primary_destruct",
    onConfirm: () => console.log("Confirmed"),
  },
};
