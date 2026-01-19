import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { useState } from "react";
import { AssetThreadsList } from "./AssetThreadsList";

const meta = {
  title: "Customer/Messages/V2/AssetThreadsList",
  component: AssetThreadsList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-[600px] w-[440px] border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AssetThreadsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create mock account (seller with organization)
const createMockSellerAccount = (): AccountModel => {
  return Store.account.create({
    id: "seller-account-1",
    email: "seller@example.com",
    first_name: "John",
    last_name: "Seller",
    organization_id: "org-123", // Seller has organization
  });
};

// Create mock assets
const createMockAsset = (
  id: string,
  overrides?: Partial<AssetModel>,
): AssetModel => {
  return Store.asset.create({
    id,
    manufacturer_name: "GE Healthcare",
    model_name: "Discovery MR750",
    year: 2018,
    price: 1250000,
    location: "Boston, MA",
    thumbnail: "https://placehold.co/100x100/e2e8f0/64748b?text=MRI",
    asset_files: [],
    ...overrides,
  });
};

// Create mock opportunity
const createMockOpportunity = (
  id: string,
  assetId: string,
  buyerAccountId: string,
): OpportunityModel => {
  return Store.opportunity.create({
    id,
    buyer_account_id: buyerAccountId,
    asset_id: assetId,
  });
};

// Create mock message
const createMockMessage = (
  id: string,
  body: string,
  opportunityId: string,
  assetId: string,
  isRead: number,
  updatedAt?: dayjs.Dayjs,
): MessageModel => {
  return Store.message.create({
    id,
    body,
    opportunity_id: opportunityId,
    asset_id: assetId,
    is_read: isRead,
    updated_at: updatedAt || dayjs(),
  });
};

export const Loading: Story = {
  args: {
    activeOpportunityId: null,
    setActiveOpportunity: (id) => console.log("Selected opportunity:", id),
    reloadedAt: new Date(),
    account: createMockSellerAccount(),
  },
};

export const EmptyState: Story = {
  args: {
    activeOpportunityId: null,
    setActiveOpportunity: (id) => console.log("Selected opportunity:", id),
    reloadedAt: new Date(),
    account: createMockSellerAccount(),
  },
};

export const WithMultipleAssets = () => {
  const [activeOpportunityId, setActiveOpportunityId] = useState<string | null>(
    null,
  );

  return (
    <div className="h-[600px] w-[440px] border">
      <AssetThreadsList
        activeOpportunityId={activeOpportunityId}
        setActiveOpportunity={setActiveOpportunityId}
        reloadedAt={new Date()}
        account={createMockSellerAccount()}
      />
    </div>
  );
};

export const Interactive = () => {
  const [activeOpportunityId, setActiveOpportunityId] = useState<string | null>(
    null,
  );
  const [reloadedAt, setReloadedAt] = useState(new Date());

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setReloadedAt(new Date())}
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Reload Messages
        </button>
        <button
          onClick={() => setActiveOpportunityId(null)}
          className="rounded border px-4 py-2"
        >
          Clear Selection
        </button>
      </div>
      <div className="h-[600px] w-[440px] border">
        <AssetThreadsList
          activeOpportunityId={activeOpportunityId}
          setActiveOpportunity={setActiveOpportunityId}
          reloadedAt={reloadedAt}
          account={createMockSellerAccount()}
        />
      </div>
      {activeOpportunityId && (
        <div className="rounded border p-4">
          <p className="text-sm font-semibold">
            Active Opportunity: {activeOpportunityId}
          </p>
        </div>
      )}
    </div>
  );
};

// Note: The actual data fetching is not implemented yet (TODO comment in component)
// These stories show the structure and loading/empty states
// Once the backend API is ready, this component will fetch and display real data
export const WithMockData = () => {
  const [activeOpportunityId, setActiveOpportunityId] = useState<string | null>(
    null,
  );

  // Mock data setup - this demonstrates what the component will look like with data
  const asset1 = createMockAsset("asset-1");
  const asset2 = createMockAsset("asset-2", {
    manufacturer_name: "Siemens",
    model_name: "Biograph mCT",
    year: 2020,
    price: 850000,
    location: "San Francisco, CA",
    thumbnail: "https://placehold.co/100x100/dbeafe/3b82f6?text=CT",
  });

  // Create mock opportunities for the assets
  const opportunity1 = createMockOpportunity("opp-1", asset1.id!, "buyer-account-1");
  const opportunity2 = createMockOpportunity("opp-2", asset2.id!, "buyer-account-2");

  // Create mock messages for the opportunities (for illustrative purposes in this story)
  const mockMessages = [
    createMockMessage(
      "msg-1",
      "Interested in the MRI machine",
      opportunity1.id!,
      asset1.id!,
      0
    ),
    createMockMessage(
      "msg-2",
      "Can you provide more details about the CT scanner?",
      opportunity2.id!,
      asset2.id!,
      0
    )
  ];

  return (
    <div className="space-y-4">
      <div className="rounded border bg-yellow-50 p-4 text-sm">
        <p className="font-semibold text-yellow-800">
          Mock Messages Preview
        </p>
        <div className="space-y-2">
          {mockMessages.map((message) => (
            <div key={message.id} className="text-yellow-700 text-sm">
              Message ID: {message.id}
              <br />
              Body: {message.body}
              <br />
              Opportunity ID: {message.opportunity_id}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[600px] w-[440px] border">
        <AssetThreadsList
          activeOpportunityId={activeOpportunityId}
          setActiveOpportunity={setActiveOpportunityId}
          reloadedAt={new Date()}
          account={createMockSellerAccount()}
        />
      </div>
    </div>
  );
};
