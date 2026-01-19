import { columns } from "@/admin/pods/opportunity/columns";
import { filters } from "@/admin/pods/opportunity/filters";
import { URLParams } from "@/common_lib/types/url";
import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface AssetOpportunitiesProps {
  asset: AssetModel;
}

export const AssetOpportunities = observer(function AssetOpportunities(
  props: AssetOpportunitiesProps,
) {
  const { asset } = props;
  const [appliedFilters, setAppliedFilters] = useState<URLParams>({
    status: ["100"],
    asset_id: asset.id || "",
    limit: "20",
  });

  return (
    <StandardTableWrap<OpportunityModel>
      className="[&_*[data-slot='table-wrap']]:h-96 [&_*[data-slot='table-wrap']]:overflow-x-auto"
      title="Opportunities"
      modelType="opportunity"
      columns={columns}
      filters={filters}
      statuses={constants.opportunity.status}
      appliedFilters={appliedFilters}
      applyFilters={setAppliedFilters}
      selectRows={false}
      hideTotalRow={true}
      tableSearch={false}
      tableExport={false}
      parent={asset}
    />
  );
});
