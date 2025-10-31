import { columns } from "@/admin/pods/asset/columns";
import { filters } from "@/admin/pods/asset/filters";
import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface RequestMatchesProps {
  request: RequestModel;
}
export const RequestMatches = observer((props: RequestMatchesProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
  });

  return (
    <div className="relative my-3 rounded-md border-y bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex grow">Matching Assets</div>
      </h1>
      <StandardTableWrap<AssetModel>
        columns={columns}
        statuses={constants.asset.status}
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
