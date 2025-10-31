import { columns } from "@/admin/pods/opportunity/columns";
import { filters } from "@/admin/pods/opportunity/filters";
import { constants } from "@/models/constants";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface OpportunitiesTableProps {
  pipeline: PipelineModel;
}
export const OpportunitiesTable = observer((props: OpportunitiesTableProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    pipeline_id: props.pipeline.id?.toString() as string,
  });

  return (
    <div className="relative my-3 rounded-md border-y bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex grow">Opportunities</div>
      </h1>
      <StandardTableWrap<OpportunityModel>
        columns={columns}
        statuses={constants.opportunity.status}
        modelType="opportunity"
        filters={filters}
        applyFilters={setAppliedFilters}
        appliedFilters={appliedFilters}
        selectRows={false}
        tableExport={true}
        tableSearch={true}
      />
    </div>
  );
});
