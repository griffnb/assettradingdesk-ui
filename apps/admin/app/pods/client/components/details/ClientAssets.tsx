import { columns } from "@/admin/pods/asset/columns";
import { filters } from "@/admin/pods/asset/filters";
import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface ClientAssetsProps {
  client: ClientModel;
}
export const ClientAssets = observer(function ClientAssets(
  props: ClientAssetsProps,
) {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    client_id: props.client.id?.toString() as string,
  });

  return (
    <div className="relative my-3 rounded-md border-y bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex grow">Assets</div>
      </h1>
      <StandardTableWrap<AssetModel>
        newComponent={`/assets/new?client_id=${props.client.id}`}
        columns={columns}
        statuses={constants.asset.status}
        modelType="asset"
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
