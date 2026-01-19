import { columns } from "@/admin/pods/opportunity/columns";
import { filters } from "@/admin/pods/opportunity/filters";
import { URLParams } from "@/common_lib/types/url";
import { constants } from "@/models/constants";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface RequestOpportunitiesProps {
  request: RequestModel;
}

export const RequestOpportunities = observer(function RequestOpportunities(
  props: RequestOpportunitiesProps,
) {
  const { request } = props;
  const [appliedFilters, setAppliedFilters] = useState<URLParams>({
    status: ["100"],
    request_id: request.id || "",
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
      parent={request}
    />
  );
});
