import { LayerService } from "@/common_lib/services/LayerService";
import {
  parseSearchParams,
  queryToFilters,
} from "@/common_lib/utils/query/builder";
import { status } from "@/models/models/asset_file/_constants/status";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { columns } from "../columns";
import {
  AssetFileFormModal,
  AssetFileFormModalId,
} from "../components/AssetFileFormModal";
import { filters } from "../filters";

export const AssetFileIndex = observer(function AssetFileIndex() {
  const [searchParams, setSearchParams] = useSearchParams();

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
  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Asset Files" },
    ]);
  }, []);

  return (
    <>
      <StandardTableWrap<AssetFileModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100svh-var(--warning-bar,0px)-var(--title-bar,175px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={() => {
          LayerService.add(AssetFileFormModalId, AssetFileFormModal, {
            onSave: () => applyFilters({ ...appliedFilters }),
          });
        }}
        columns={columns}
        statuses={status}
        modelType="asset_file"
        filters={filters}
        applyFilters={applyFilters}
        appliedFilters={appliedFilters}
        selectRows={true}
        tableSearch={true}
        tableExport={true}
        hideTotalRow={true}
        infiniteScroll={true}
        massActions={[(props) => <DefaultMassActions {...props} />]}
      />
    </>
  );
});
