import { columns } from "@/admin/pods/request/columns";
import { filters } from "@/admin/pods/request/filters";
import { URLParams } from "@/common_lib/types/url";
import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface AssetMatchesProps {
  asset: AssetModel;
}

export const AssetMatches = observer(function AssetMatches(
  props: AssetMatchesProps,
) {
  const { asset } = props;
  const [appliedFilters, setAppliedFilters] = useState<URLParams>({
    status: ["100"],
    limit: "20",
  });

  return (
    <div className="p-10">
      <StandardTableWrap<RequestModel>
        title="Matching Requests"
        modelType="request"
        columns={columns}
        filters={filters}
        statuses={constants.request.status}
        appliedFilters={appliedFilters}
        applyFilters={setAppliedFilters}
        selectRows={false}
        hideTotalRow={true}
        tableSearch={false}
        tableExport={false}
        customPath={`matches/${asset.id}`}
        parent={asset}
      />
    </div>
  );
});
