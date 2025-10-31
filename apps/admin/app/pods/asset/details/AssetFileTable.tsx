import { columns } from "@/admin/pods/asset_file/columns";
import { filters } from "@/admin/pods/asset_file/filters";
import { URLParams } from "@/common_lib/types/url";
import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";

interface AssetFileTableProps {
  asset: AssetModel;
}

export const AssetFileTable = observer(function AssetFileTable(
  props: AssetFileTableProps,
) {
  const { asset } = props;
  const [appliedFilters, setAppliedFilters] = useState<URLParams>({
    status: ["100"],
    limit: "20",
    asset_id: asset.id || "",
  });

  const applyFilters = useCallback(
    (filters: URLParams) => {
      setAppliedFilters(filters);
    },
    [asset.id],
  );

  return (
    <div className="p-10">
      <StandardTableWrap<AssetFileModel>
        title="Files"
        modelType="asset_file"
        columns={columns}
        filters={filters}
        statuses={constants.asset_file.status}
        appliedFilters={appliedFilters}
        applyFilters={applyFilters}
        selectRows={false}
        hideTotalRow={true}
        tableSearch={false}
        tableExport={false}
      />
    </div>
  );
});
