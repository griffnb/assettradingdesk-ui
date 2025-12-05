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
    opportunityId: null,
    account: mockBuyerAccount,
  },
};

/**
 * Loading state while fetching messages
 * Note: In real usage, this would show briefly while data loads
 */
export const LoadingState: Story = {
  args: {
    opportunityId: "opp-loading",
    account: mockBuyerAccount,
  },
};

/**
 * Active conversation with messages (Buyer view)
 * Shows asset header, messages, and reply box
 *
 * Note: This story will attempt to load real data from the API.
 * For full functionality, ensure:
 * - Backend is running
 * - Test opportunity exists with messages
 * - Account has proper permissions
 */
export const BuyerView: Story = {
  args: {
    opportunityId: "test-opportunity-id", // Replace with real test opportunity ID
    account: mockBuyerAccount,
    reloadList: () => console.log("Reload list called"),
  },
};

/**
 * Active conversation (Seller view)
 * Shows conversation from seller's perspective
 */
export const SellerView: Story = {
  args: {
    opportunityId: "test-opportunity-id", // Replace with real test opportunity ID
    account: mockSellerAccount,
    reloadList: () => console.log("Reload list called"),
  },
};

/**
 * Example usage documentation
 *
 * The MessageThreadPanel component loads and displays messages for a specific opportunity.
 * It handles:
 * - Loading messages from the API
 * - Displaying asset context (image, name, price, location)
 * - Rendering message bubbles with proper alignment
 * - Marking messages as read when viewed
 * - Sending replies via MessageService
 * - Determining if user is buyer or seller based on organization_id
 *
 * Integration Example:
 * ```tsx
 * import { MessageThreadPanel } from "@/ui/customer/messages";
 * import { useAccount } from "@/hooks/useAccount";
 *
 * function MessagesPage() {
 *   const [activeOpportunityId, setActiveOpportunityId] = useState<string | null>(null);
 *   const account = useAccount();
 *
 *   return (
 *     <MessageThreadPanel
 *       opportunityId={activeOpportunityId}
 *       account={account}
 *       reloadList={handleReloadList}
 *       clearActiveThread={() => setActiveOpportunityId(null)}
 *     />
 *   );
 * }
 * ```
 *
 * TODO items:
 * - Load other party account names dynamically instead of using join fields
 * - Add error handling UI for failed message sends
 * - Consider adding real-time updates via websockets
 * - Add pagination for long message threads
 */
export const Documentation: Story = {
  args: {
    opportunityId: null,
    account: mockBuyerAccount,
  },
};
