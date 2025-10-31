import ServerTableWrap from "@/common_lib/components/table/ServerTableWrap";
import { columns } from "@/pods/request/columns";
import { filters } from "@/pods/request/filters";
import RequestModel from "@/pods/request/model/RequestModel";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import { useState } from "react";
import AssetModel from "../../model/AssetModel";

interface AssetMatchesProps {
  asset: AssetModel;
}
const AssetMatches = observer((props: AssetMatchesProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
  });

  return (
    <div className="relative my-3 rounded-md border-y-1 bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex flex-grow">Matching Requests</div>
      </h1>
      <ServerTableWrap<RequestModel>
        columns={columns}
        statuses={constants.request.status}
        modelType="request"
        filters={filters}
        applyFilters={setAppliedFilters}
        appliedFilters={appliedFilters}
        selectRows={false}
        customPath={`matches/${props.asset.id}`}
        parent={props.asset}
      />
    </div>
  );
});

export default AssetMatches;
