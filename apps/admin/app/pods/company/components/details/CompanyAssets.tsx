import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { columns } from "@/admin/pods/asset/columns";
import { filters } from "@/admin/pods/asset/filters";
import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";

interface CompanyAssetsProps {
  company: CompanyModel;
}
export const CompanyAssets = observer(function CompanyAssets(
  props: CompanyAssetsProps,
) {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    company_id: props.company.id?.toString() as string,
  });

  return (
    <div className="relative my-3 rounded-md border-y bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex grow">Assets</div>
      </h1>
      <StandardTableWrap<AssetModel>
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
