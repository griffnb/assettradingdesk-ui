import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, ReactNode } from "react";
import { CustomerDashboardHeader } from "./CustomerDashboardHeader";
import {
  CustomerDashboardListingsTable,
  ListingData,
} from "./CustomerDashboardListingsTable";
import {
  CustomerDashboardOffersTable,
  OfferData,
} from "./CustomerDashboardOffersTable";
import {
  CustomerDashboardStatsGrid,
  DashboardStat,
} from "./CustomerDashboardStatsGrid";
import { CustomerDashboardSuggestedTools } from "./CustomerDashboardSuggestedTools";

export interface CustomerDashboardViewProps
  extends HTMLAttributes<HTMLDivElement> {
  userName?: string;
  stats: DashboardStat[];
  suggestedTools: AssetModel[];
  offers: OfferData[];
  listings: ListingData[];
  badge?: ReactNode;
  onViewAllTools?: () => void;
  onViewAllOffers?: () => void;
  onViewAllListings?: () => void;
  onManageListing?: (id: string) => void;
}

export const CustomerDashboardView = observer(function CustomerDashboardView(
  fullProps: CustomerDashboardViewProps,
) {
  const {
    className,
    userName,
    stats,
    suggestedTools,
    offers,
    listings,
    badge,
    onViewAllTools,
    onViewAllOffers,
    onViewAllListings,
    onManageListing,
    ...props
  } = fullProps;

  return (
    <div className={cn("flex w-full flex-col gap-6 p-8", className)} {...props}>
      <CustomerDashboardHeader userName={userName} />
      <CustomerDashboardStatsGrid stats={stats} />
      <div className="flex w-full flex-col gap-7">
        <CustomerDashboardSuggestedTools
          assets={suggestedTools}
          onViewAll={onViewAllTools}
          badge={badge}
        />
        <div className="flex w-full gap-10">
          <CustomerDashboardOffersTable
            offers={offers}
            onViewAll={onViewAllOffers}
          />
          <CustomerDashboardListingsTable
            listings={listings}
            onViewAll={onViewAllListings}
            onManage={onManageListing}
          />
        </div>
      </div>
    </div>
  );
});
