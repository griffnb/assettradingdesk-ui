import { LayerService } from "@/common_lib/services/LayerService";
import { status } from "@/models/models/asset/_constants/status";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import {
  AssetPreview,
  AssetPreviewId,
} from "@/ui/customer/assets/management/AssetPreview";
import { Button } from "@/ui/shadcn/ui/button";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { Package, Plus } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { columns } from "./columns";
import { filters } from "./filters";

export const AssetManagementIndex = observer(function AssetManagementIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const appliedFilters = useMemo(
    () =>
      queryToFilters(parseSearchParams(searchParams), {
        status: [],
        limit: "100",
      }),
    [searchParams],
  );

  const applyFilters = (params: { [key: string]: string | string[] }) => {
    setSearchParams(params);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <Package className="size-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Assets</h1>
            <p className="text-sm text-muted-foreground">
              Manage your asset inventory
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate("/manage/assets/new")}
          className="gap-2"
        >
          <Plus className="size-4" />
          New Asset
        </Button>
      </div>
      <StandardTableWrap<AssetModel>
        className="[&_*[data-slot='table-wrap']]:flex-1 [&_*[data-slot='table-wrap']]:overflow-x-auto"
        columns={columns}
        statuses={status}
        modelType="asset"
        //customPath="manage"
        filters={filters}
        applyFilters={applyFilters}
        appliedFilters={appliedFilters}
        selectRows={true}
        tableSearch={true}
        tableExport={true}
        hideTotalRow={true}
        infiniteScroll={true}
        massActions={[(props) => <DefaultMassActions {...props} />]}
        rowClickAction={(record) => {
          LayerService.add({
            id: AssetPreviewId,
            component: AssetPreview,
            props: { record },
          });
        }}
      />
    </div>
  );
});
