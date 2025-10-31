import ServerTableWrap from "@/common_lib/components/table/ServerTableWrap";
import { columns } from "@/pods/opportunity/columns";
import { filters } from "@/pods/opportunity/filters";
import OpportunityModel from "@/pods/opportunity/model/OpportunityModel";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import { useState } from "react";
import PipelineModel from "../../model/PipelineModel";

interface OpportunitiesTableProps {
  pipeline: PipelineModel;
}
const OpportunitiesTable = observer((props: OpportunitiesTableProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    pipeline_id: props.pipeline.id?.toString() as string,
  });

  return (
    <div className="relative my-3 rounded-md border-y-1 bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex flex-grow">Opportunities</div>
      </h1>
      <ServerTableWrap<OpportunityModel>
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

export default OpportunitiesTable;
