import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { Badge } from "@/ui/shadcn/ui/badge";
import { cn } from "@/utils/cn";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { OpportunityThreadItem } from "./OpportunityThreadItem";
import { formatPrice } from "./utils";

export interface OpportunityData {
  opportunity: OpportunityModel;
  messages: MessageModel[];
  unreadCount: number;
}

export interface AssetThreadItemProps {
  asset: AssetModel;
  opportunities: OpportunityData[];
  activeOpportunityId: string | null;
  onSelectOpportunity: (opportunityId: string) => void;
}

/**
 * Expandable card showing asset details with nested OpportunityThreadItem components
 * Used in seller view to show all buyer conversations for a specific asset
 *
 * @example
 * <AssetThreadItem
 *   asset={assetModel}
 *   opportunities={[
 *     {
 *       opportunity: opportunityModel,
 *       messages: messageModels,
 *       unreadCount: 2
 *     }
 *   ]}
 *   activeOpportunityId={null}
 *   onSelectOpportunity={(id) => {}}
 * />
 */
export const AssetThreadItem = observer(function AssetThreadItem({
  asset,
  opportunities,
  activeOpportunityId,
  onSelectOpportunity,
}: AssetThreadItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalUnread = opportunities.reduce(
    (sum, opp) => sum + opp.unreadCount,
    0,
  );

  const assetTitle =
    `${asset.manufacturer_name || ""} ${asset.model_name || ""}`.trim() ||
    "Unknown Asset";
  const assetYear = asset.year ? ` • ${asset.year}` : "";
  const assetPrice = asset.price ? ` • ${formatPrice(asset.price)}` : "";
  const assetLocation = asset.location ? asset.location : "";

  return (
    <div className="border-b border-border-neutral-primary">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
          "hover:bg-bg-neutral-tertiary",
          totalUnread > 0 ? "bg-white" : "bg-bg-neutral-secondary",
        )}
      >
        <img
          src={asset.thumbnail}
          alt={assetTitle}
          className="size-12 flex-none rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "text-sm",
              totalUnread > 0 ? "font-bold" : "font-semibold",
            )}
          >
            {assetTitle}
          </div>
          <div className="text-xs text-text-neutral-quaternary">
            {assetYear}
            {assetPrice}
          </div>
          {assetLocation && (
            <div className="text-xs text-text-neutral-quaternary">
              {assetLocation}
            </div>
          )}
          <div className="mt-1 text-xs text-text-neutral-quaternary">
            {opportunities.length} conversation
            {opportunities.length !== 1 ? "s" : ""}
          </div>
        </div>
        <div className="flex flex-none items-center gap-2">
          {totalUnread > 0 && (
            <Badge className="bg-primary/20 text-primary" variant="secondary">
              {totalUnread}
            </Badge>
          )}
          {isExpanded ? (
            <ChevronDownIcon className="size-4 text-text-neutral-quaternary" />
          ) : (
            <ChevronRightIcon className="size-4 text-text-neutral-quaternary" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="bg-bg-neutral-tertiary/50">
          {opportunities.map(({ opportunity, messages, unreadCount }) => (
            <OpportunityThreadItem
              key={opportunity.id}
              opportunity={opportunity}
              messages={messages}
              unreadCount={unreadCount}
              active={activeOpportunityId === opportunity.id}
              onClick={() => {
                if (opportunity.id) {
                  onSelectOpportunity(opportunity.id);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});
