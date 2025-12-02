import { AnalyticsDashboardShowcase } from "@/ui/examples/screens/AnalyticsDashboardShowcase";

import { AssetCatalogShowcase } from "@/ui/examples/screens/AssetCatalogShowcase";
import { AssetDetailsShowcase } from "@/ui/examples/screens/AssetDetailsShowcase";
import { MessagingCenterShowcase } from "@/ui/examples/screens/MessagingCenterShowcase";
import { OpportunitiesShowcase } from "@/ui/examples/screens/OpportunitiesShowcase";
import { PipelineBoardShowcase } from "@/ui/examples/screens/PipelineBoardShowcase";
import { SearchAlertsShowcase } from "@/ui/examples/screens/SearchAlertsShowcase";
import { SellerListingShowcase } from "@/ui/examples/screens/SellerListingShowcase";
import { TaxonomyLandingShowcase } from "@/ui/examples/screens/TaxonomyLandingShowcase";
export default function Examples() {
  return (
    <>
      <AnalyticsDashboardShowcase />

      <AssetCatalogShowcase />
      <AssetDetailsShowcase />
      <MessagingCenterShowcase />
      <OpportunitiesShowcase />
      <PipelineBoardShowcase />
      <SearchAlertsShowcase />
      <SellerListingShowcase />
      <TaxonomyLandingShowcase />
    </>
  );
}
