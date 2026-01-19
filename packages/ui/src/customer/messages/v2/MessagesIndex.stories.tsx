import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrowserRouter } from "react-router";
import { MessagesIndex } from "./MessagesIndex";

const meta = {
  title: "Customer/Messages/V2/MessagesIndex",
  component: MessagesIndex,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="flex h-screen w-full">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof MessagesIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Buyer view - Shows conversation list and Start Conversation button
 *
 * In buyer view:
 * - Displays RequestThreadsList (flat list of conversations)
 * - Shows "Start Conversation" button in header
 * - Can select opportunities to view message threads
 * - URL updates to /messages/:opportunityId when conversation selected
 */
export const BuyerView: Story = {
  args: {
    account: Store.account.create({}),
  },
  parameters: {
    docs: {
      description: {
        story: `
Buyer view displays a flat list of conversations grouped by opportunity.
Each item shows the asset details with the last message preview.

Features:
- Start Conversation button to begin new inquiries
- Click on conversation to view full thread
- URL-based navigation for deep linking
- Resizable left panel on desktop
- Mobile-responsive with modal thread view
        `,
      },
    },
  },
};

/**
 * Example usage documentation
 *
 * The MessagesIndex component is the main container for the asset messaging system.
 * It replaces the email-based AtlasMailIndex with asset-opportunity-based messaging.
 *
 * Key Features:
 * - Role-based views (buyer vs seller)
 * - URL-based navigation with React Router
 * - Resizable panels on desktop
 * - Mobile-responsive with LayerService modals
 * - Real-time unread counts
 * - Deep linking support via URL parameters
 *
 * Architecture:
 * - Left panel: AssetThreadsList (sellers) or RequestThreadsList (buyers)
 * - Right panel: MessageThreadPanel (shows selected conversation)
 * - Header: Title + action button (Start Conversation for buyers only)
 * - Resizable divider between panels (desktop only)
 *
 * Integration Example:
 * ```tsx
 * // In your route file: /messages/$opportunityId/index.tsx
 * import { MessagesIndex } from '@/ui/customer/messages';
 *
 * export default function MessagesRoute() {
 *   return <MessagesIndex />;
 * }
 * ```
 *
 * URL Patterns:
 * - `/messages` - List view with no conversation selected
 * - `/messages/:opportunityId` - List view with specific conversation active
 *
 * Role Detection:
 * - Buyer: `account.organization_id === null`
 * - Seller: `account.organization_id !== null`
 *
 * Component Hierarchy:
 * ```
 * MessagesIndex
 * ├── Header (Title + Start Conversation button for buyers)
 * ├── Left Panel (resizable, 440px default)
 * │   ├── AssetThreadsList (for sellers)
 * │   │   └── AssetThreadItem (expandable)
 * │   │       └── OpportunityThreadItem[]
 * │   └── RequestThreadsList (for buyers)
 * │       └── RequestThreadItem (flat list)
 * ├── Resize Handle
 * └── Right Panel
 *     └── MessageThreadPanel
 *         ├── Asset Context Header
 *         ├── Message List (MessageBubble[])
 *         └── ReplyBox
 * ```
 *
 * Differences from AtlasMailIndex:
 * - No email folders (inbox/sent/spam/drafts)
 * - No tabs navigation
 * - No drafts support
 * - Conversations grouped by opportunity instead of email threads
 * - Role-based UI instead of universal email interface
 * - React Router instead of Next.js router
 * - Asset context always visible in thread view
 *
 * TODO items:
 * - Add search/filter functionality
 * - Add pagination for message lists
 * - Consider real-time updates (websockets)
 * - Add keyboard shortcuts
 * - Add loading states for initial data fetch
 * - Consider adding notification badges to browser tab
 */
export const Documentation: Story = {
  args: {
    account: Store.account.create({}),
  },
};

/**
 * Empty state - No conversations yet
 * Shows when user has no messages
 */
export const EmptyState: Story = {
  args: {
    account: Store.account.create({}),
  },
  parameters: {
    docs: {
      description: {
        story: `
Empty state appears when user has no conversations yet.
Buyers will see the "Start Conversation" button to begin.
Sellers will see "No Messages" in their asset list.
        `,
      },
    },
  },
};

/**
 * Mobile view - Conversation opens in modal
 * On small screens, selecting a conversation opens MessageThreadPanel in a modal
 */
export const MobileView: Story = {
  args: {
    account: Store.account.create({}),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: `
On mobile devices (below LG breakpoint), the MessagesIndex adapts:
- Left panel takes full width
- Selecting conversation opens MessageThreadPanel in LayerService modal
- Back button in modal returns to conversation list
- Resizable divider is disabled
        `,
      },
    },
  },
};
