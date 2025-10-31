import ServerTableWrap from "@/common_lib/components/table/ServerTableWrap";
import { columns } from "@/pods/asset/columns";
import { filters } from "@/pods/asset/filters";
import AssetModel from "@/pods/asset/model/AssetModel";

import RequestModel from "@/pods/request/model/RequestModel";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import { useState } from "react";

interface RequestMatchesProps {
  request: RequestModel;
}
const RequestMatches = observer((props: RequestMatchesProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
  });

  return (
    <div className="relative my-3 rounded-md border-y-1 bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex flex-grow">Matching Assets</div>
      </h1>
      <ServerTableWrap<AssetModel>
        columns={columns}
        statuses={constants.request.status}
        modelType="asset"
        filters={filters}
        applyFilters={setAppliedFilters}
        appliedFilters={appliedFilters}
        selectRows={false}
        customPath={`matches/${props.request.id}`}
        parent={props.request}
      />
    </div>
  );
});

export default RequestMatches;
