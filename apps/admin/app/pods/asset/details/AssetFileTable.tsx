import ServerTableWrap from "@/common_lib/components/table/ServerTableWrap";
import { columns } from "@/pods/asset-file/columns";
import { filters } from "@/pods/asset-file/filters";
import AssetFileModel from "@/pods/asset-file/model/AssetFileModel";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import { useState } from "react";
import AssetModel from "../../model/AssetModel";

interface AssetFileTableProps {
  asset: AssetModel;
}
const AssetFileTable = observer((props: AssetFileTableProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    asset_id: props.asset.id?.toString() as string,
  });

  return (
    <div className="border-y-1 relative my-3 rounded-md bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex flex-grow">Assets</div>
      </h1>
      <ServerTableWrap<AssetFileModel>
        columns={columns}
        statuses={constants["asset-file"].status}
        modelType="asset-file"
        filters={filters}
        applyFilters={setAppliedFilters}
        appliedFilters={appliedFilters}
        selectRows={false}
      />
    </div>
  );
});

export default AssetFileTable;
