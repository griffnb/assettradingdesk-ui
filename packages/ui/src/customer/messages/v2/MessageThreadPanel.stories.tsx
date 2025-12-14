import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessageThreadPanel } from "./MessageThreadPanel";

const meta = {
  title: "Customer/Messages/V2/MessageThreadPanel",
  component: MessageThreadPanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-[800px] w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageThreadPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create mock account models for testing
const mockBuyerAccount = Store.account.create();
mockBuyerAccount.id = "buyer-123";
mockBuyerAccount.name = "Alice Buyer";
mockBuyerAccount.organization_id = null; // Buyer has no org

const mockSellerAccount = Store.account.create();
mockSellerAccount.id = "seller-456";
mockSellerAccount.name = "John Seller";
mockSellerAccount.organization_id = "org-789"; // Seller has org

/**
 * No message selected - shows empty state
 */
export const NoSelection: Story = {
  args: {
    threadId: null,
    account: mockBuyerAccount,
  },
};
