import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PageButtons } from "./PageButtons";
import { RequestThreadItem } from "./RequestThreadItem";

interface RequestThreadsListProps {
  activeOpportunityId: string | null;
  setActiveOpportunity: (opportunityId: string) => void;
  reloadedAt: Date;
  account: AccountModel;
}
const PAGE_SIZE = 50;
/**
 * Display list of buyer's sent message conversations grouped by request/opportunity
 * This displays the buyer's conversation list (flat, no nesting)
 * Pattern from ThreadsList.tsx
 *
 * @example
 * <RequestThreadsList
 *   activeOpportunityId={activeOpportunityId}
 *   setActiveOpportunity={setActiveOpportunity}
 *   reloadedAt={reloadedAt}
 *   account={account}
 * />
 */
export const RequestThreadsList = observer(function RequestThreadsList({
  activeOpportunityId,
  setActiveOpportunity,
  reloadedAt,
  account,
}: RequestThreadsListProps) {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<OpportunityModel[]>([]);
  const [groupedData, setGroupedData] = useState<
    Map<
      string,
      { asset: AssetModel; messages: MessageModel[]; unreadCount: number }
    >
  >(new Map());

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const createMockData = () => {
      // Create mock assets
      const asset1 = Store.asset.create({
        id: "asset1",
        label: "Luxury Yacht",
        description: "High-end yacht for sale",
      });
      const asset2 = Store.asset.create({
        id: "asset2",
        label: "Private Jet",
        description: "Gulfstream G650 executive jet",
      });
      const asset3 = Store.asset.create({
        id: "asset3",
        label: "Rare Art Piece",
        description: "Vintage painting by a renowned artist",
      });

      // Create mock opportunities
      const opp1 = Store.opportunity.create({
        id: "opp1",
        asset_id: asset1.id,
        buyer_account_id: account.id,
        seller_account_id: "seller-account-1",
      });
      const opp2 = Store.opportunity.create({
        id: "opp2",
        asset_id: asset2.id,
        buyer_account_id: account.id,
        seller_account_id: "seller-account-2",
      });
      const opp3 = Store.opportunity.create({
        id: "opp3",
        asset_id: asset3.id,
        buyer_account_id: account.id,
        seller_account_id: "seller-account-3",
      });

      // Create mock messages for each opportunity
      const messages1 = [
        Store.message.create({
          id: "msg1",
          opportunity_id: opp1.id,
          from_account_id: account.id,
          body: "Interested in the yacht. Can you provide more details?",
          is_read: 1,
        }),
        Store.message.create({
          id: "msg2",
          opportunity_id: opp1.id,
          from_account_id: "seller1",
          body: "Certainly! The yacht is in excellent condition.",
          is_read: 0,
        }),
      ];

      const messages2 = [
        Store.message.create({
          id: "msg3",
          opportunity_id: opp2.id,
          from_account_id: account.id,
          body: "Would like to discuss the private jet specifications.",
          is_read: 1,
        }),
        Store.message.create({
          id: "msg4",
          opportunity_id: opp2.id,
          from_account_id: "seller2",
          body: "Happy to provide full technical details.",
          is_read: 0,
        }),
      ];

      const messages3 = [
        Store.message.create({
          id: "msg5",
          opportunity_id: opp3.id,
          from_account_id: account.id,
          body: "Interested in the rare art piece. Authentication details?",
          is_read: 1,
        }),
        Store.message.create({
          id: "msg6",
          opportunity_id: opp3.id,
          from_account_id: "seller3",
          body: "Certified by multiple art authentication experts.",
          is_read: 0,
        }),
      ];

      // Prepare grouped data
      const finalGroupedData = new Map();
      finalGroupedData.set(opp1.id, {
        asset: asset1,
        messages: messages1,
        unreadCount: messages1.filter(
          (m) => m.is_read === 0 && m.from_account_id !== account.id,
        ).length,
      });
      finalGroupedData.set(opp2.id, {
        asset: asset2,
        messages: messages2,
        unreadCount: messages2.filter(
          (m) => m.is_read === 0 && m.from_account_id !== account.id,
        ).length,
      });
      finalGroupedData.set(opp3.id, {
        asset: asset3,
        messages: messages3,
        unreadCount: messages3.filter(
          (m) => m.is_read === 0 && m.from_account_id !== account.id,
        ).length,
      });

      setOpportunities([opp1, opp2, opp3]);
      setGroupedData(finalGroupedData);
      setLoading(false);
    };

    // Create mock data immediately
    createMockData();
  }, [reloadedAt, account.id]);

  // Implement search filter
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const data = groupedData.get(opportunity.id!);
    return (
      data && data.asset.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderRequestList = () => {
    if (filteredOpportunities.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center p-8 text-center">
          <span className="mx-auto font-semibold uppercase text-text-neutral-quinary-disabled">
            {searchTerm ? "No conversations match your search" : "No Messages"}
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        {filteredOpportunities.map((opportunity) => {
          const opportunityId = opportunity.id;
          if (!opportunityId) return null;

          const data = groupedData.get(opportunityId);
          if (!data) return null;

          return (
            <RequestThreadItem
              key={opportunityId}
              opportunity={opportunity}
              asset={data.asset}
              messages={data.messages}
              unreadCount={data.unreadCount}
              active={activeOpportunityId === opportunityId}
              onClick={() => setActiveOpportunity(opportunityId)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="group relative flex size-full h-fit min-h-full shrink-0 grow-0 flex-col bg-bg-neutral-secondary">
      <div className="sticky top-0 z-10 box-border w-full border-b border-border-neutral-primary bg-bg-neutral-secondary p-4 font-semibold text-text-neutral-quaternary">
        <div className="hidden flex-row items-center justify-between lg:flex">
          <div>Messages</div>
          <PageButtons
            loading={loading}
            page={1}
            setPage={() => {}}
            total={5}
            pageSize={PAGE_SIZE}
          />
        </div>
        <div className="relative mt-2 flex w-full flex-1 flex-row items-center gap-2">
          <div className="flex-1 rounded-lg border text-xs">
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
              className="w-full rounded-lg border-none px-4 py-1.5 !ring-0"
              placeholder="Search"
            />
          </div>
          <div className="lg:hidden lg:w-0">
            <PageButtons
              loading={loading}
              page={1}
              setPage={() => {}}
              total={5}
              pageSize={PAGE_SIZE}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-1 items-center justify-center p-8">
          <i className="fa fa-spinner fa-spin text-icon-neutral-quaternary" />
        </div>
      ) : (
        renderRequestList()
      )}
    </div>
  );
});
