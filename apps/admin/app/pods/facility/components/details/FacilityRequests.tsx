import { columns } from "@/admin/pods/request/columns";
import { filters } from "@/admin/pods/request/filters";
import { constants } from "@/models/constants";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface FacilityRequestsProps {
  facility: FacilityModel;
}
export const FacilityRequests = observer(function FacilityRequests(
  props: FacilityRequestsProps,
) {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    facility_id: props.facility.id?.toString() as string,
  });

  return (
    <div className="relative my-3 rounded-md border-y bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex grow">Requests</div>
      </h1>
      <StandardTableWrap<RequestModel>
        columns={columns}
        statuses={constants.request.status}
        modelType="request"
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

export default FacilityRequests;
