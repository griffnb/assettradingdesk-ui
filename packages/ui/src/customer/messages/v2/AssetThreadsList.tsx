import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AssetThreadItem, OpportunityData } from "./AssetThreadItem";
import { Store } from "@/models/store/Store";

interface AssetThreadsListProps {
  activeOpportunityId: string | null;
  setActiveOpportunity: (opportunityId: string) => void;
  reloadedAt: Date;
  account: AccountModel;
}

/**
 * Seller view: Displays list of assets that have messages, with nested opportunities
 * Groups messages by asset_id, then by opportunity_id within each asset
 * Shows unread counts and allows selecting conversations
 *
 * @example
 * <AssetThreadsList
 *   activeOpportunityId={activeId}
 *   setActiveOpportunity={(id) => setActiveId(id)}
 *   reloadedAt={new Date()}
 *   account={accountModel}
 * />
 */
export const AssetThreadsList = observer(function AssetThreadsList({
  activeOpportunityId,
  setActiveOpportunity,
  reloadedAt,
  account,
}: AssetThreadsListProps) {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [assetOpportunities, setAssetOpportunities] = useState<
    Map<string, OpportunityData[]>
  >(new Map());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    generateMockAssetThreads();
  }, [reloadedAt, account.id]);

  const generateMockAssetThreads = async () => {
    try {
      // Create mock assets with proper type definition
      const mockAsset1 = Store.asset.create({
        manufacturer_name: 'Caterpillar',
        model_name: 'D6 Dozer',
        description: 'Heavy-duty bulldozer for large construction projects'
      } as Partial<AssetModel>);

      const mockAsset2 = Store.asset.create({
        manufacturer_name: 'Komatsu',
        model_name: 'PC350 Excavator',
        description: 'Powerful hydraulic excavator for mining and construction'
      } as Partial<AssetModel>);

      const mockAsset3 = Store.asset.create({
        manufacturer_name: 'John Deere',
        model_name: '844K Wheel Loader',
        description: 'High-performance wheel loader for material handling'
      } as Partial<AssetModel>);

      // Create mock opportunities for each asset
      const mockOpportunity1 = Store.opportunity.create({
        asset_id: mockAsset1.id,
        status: 1, // Assuming 1 represents 'active'
        description: 'Potential sale for construction project'
      } as Partial<{
        asset_id: string;
        status: number;
        description: string;
      }>);

      const mockOpportunity2 = Store.opportunity.create({
        asset_id: mockAsset2.id,
        status: 2, // Assuming 2 represents 'negotiating'
        description: 'Mining company interested in equipment'
      } as Partial<{
        asset_id: string;
        status: number;
        description: string;
      }>);

      const mockOpportunity3 = Store.opportunity.create({
        asset_id: mockAsset3.id,
        status: 3, // Assuming 3 represents 'pending'
        description: 'Quarry expansion equipment inquiry'
      } as Partial<{
        asset_id: string;
        status: number;
        description: string;
      }>);

      // Create mock messages for opportunities
      const mockMessage1 = Store.message.create({
        opportunity_id: mockOpportunity1.id,
        asset_id: mockAsset1.id,
        to_account_id: account.id,
        message: 'Interested in the Caterpillar D6 Dozer',
        is_read: 0
      } as Partial<{
        opportunity_id: string;
        asset_id: string;
        to_account_id: string;
        message: string;
        is_read: number;
      }>);

      const mockMessage2 = Store.message.create({
        opportunity_id: mockOpportunity2.id,
        asset_id: mockAsset2.id,
        to_account_id: account.id,
        message: 'Can you provide more details about the Komatsu PC350?',
        is_read: 1
      } as Partial<{
        opportunity_id: string;
        asset_id: string;
        to_account_id: string;
        message: string;
        is_read: number;
      }>);

      const mockMessage3 = Store.message.create({
        opportunity_id: mockOpportunity3.id,
        asset_id: mockAsset3.id,
        to_account_id: account.id,
        message: 'Inquiring about John Deere 844K Wheel Loader availability',
        is_read: 0
      } as Partial<{
        opportunity_id: string;
        asset_id: string;
        to_account_id: string;
        message: string;
        is_read: number;
      }>);

      // Group opportunities by asset
      const assetOppsMap = new Map<string, OpportunityData[]>();

      [mockAsset1, mockAsset2, mockAsset3].forEach(asset => {
        const opportunityDataList: OpportunityData[] = [];

        const opportunities = [mockOpportunity1, mockOpportunity2, mockOpportunity3]
          .filter(opp => opp.asset_id === asset.id);

        opportunities.forEach(opportunity => {
          const messages = [mockMessage1, mockMessage2, mockMessage3]
            .filter(msg => msg.opportunity_id === opportunity.id);

          const unreadCount = messages.filter(m => m.is_read === 0).length;

          opportunityDataList.push({
            opportunity,
            messages,
            unreadCount,
          });
        });

        assetOppsMap.set(asset.id || '', opportunityDataList);
      });

      console.log('Generated Mock Asset Threads', {
        assets: [mockAsset1, mockAsset2, mockAsset3],
        opportunities: assetOppsMap
      });

      setAssets([mockAsset1, mockAsset2, mockAsset3]);
      setAssetOpportunities(assetOppsMap);
    } catch (error) {
      console.error('Error generating mock asset threads', error);
      setAssets([]);
      setAssetOpportunities(new Map());
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = assets.filter(asset => {
    const manufacturerName = asset.manufacturer_name?.toLowerCase() || '';
    const modelName = asset.model_name?.toLowerCase() || '';
    const searchTermLower = searchTerm.toLowerCase();

    return manufacturerName.includes(searchTermLower) ||
           modelName.includes(searchTermLower);
  });

  const renderAssetList = () => {
    if (filteredAssets.length === 0) {
      return (
        <div className="m-auto flex size-full flex-row place-items-center overflow-y-auto overflow-x-hidden">
          <span className="mx-auto font-semibold uppercase text-text-neutral-quinary-disabled">
            {searchTerm ? 'No Matching Assets' : 'No Messages'}
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        {filteredAssets.map((asset) => {
          const opportunities = assetOpportunities.get(asset.id || "") || [];
          return (
            <AssetThreadItem
              key={asset.id}
              asset={asset}
              opportunities={opportunities}
              activeOpportunityId={activeOpportunityId}
              onSelectOpportunity={setActiveOpportunity}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="group relative flex size-full h-fit min-h-full shrink-0 grow-0 flex-col bg-bg-neutral-secondary">
      <div className="sticky top-0 z-10 box-border w-full border-b border-border-neutral-primary bg-bg-neutral-secondary p-4 flex items-center">
        <div className="font-semibold text-text-neutral-quaternary grow">
          My Assets
        </div>
        <input
          type="text"
          placeholder="Search by manufacturer or model"
          className="border border-border-neutral-primary rounded px-2 py-1 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="m-auto flex size-full flex-row place-items-center">
          <i className="fa fa-spinner fa-spin mx-auto" />
        </div>
      ) : (
        renderAssetList()
      )}
    </div>
  );
});