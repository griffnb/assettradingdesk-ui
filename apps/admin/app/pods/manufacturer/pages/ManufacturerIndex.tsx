import { LayerService } from "@/common_lib/services/LayerService";
import { status } from "@/models/models/manufacturer/_constants/status";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { columns } from "../columns";
import {
  ManufacturerFormModal,
  ManufacturerFormModalId,
} from "../components/ManufacturerFormModal";
import { filters } from "../filters";

export const ManufacturerIndex = observer(function ManufacturerIndex() {
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
  return (
    <>
      <AdminTitleBar title="Manufacturers" />
      <StandardTableWrap<ManufacturerModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100svh-var(--warning-bar,0px)-var(--title-bar,175px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={() => {
          LayerService.add(ManufacturerFormModalId, ManufacturerFormModal, {
            onSave: () => applyFilters({ ...appliedFilters }),
          });
        }}
        columns={columns}
        statuses={status}
        modelType="manufacturer"
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
