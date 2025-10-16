import {StandardTableWrap} from "@/ui/common/components/table/StandardTableWrap";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { LayerService } from "@/common_lib/services/LayerService";
import {
  FacilityFormModal,
  FacilityFormModalId,
} from "../components/FacilityFormModal";
import { useSearchParams } from "react-router";
import DefaultMassActions from "@/ui/common/components/table/nav/DefaultMassActions";
import { MassActionProps } from "@/ui/common/components/types/mass-actions";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { status } from "@/models/models/facility/_constants/status";
import { columns } from "../columns";
import { filters } from "../filters";
import { useMemo } from "react";



export const FacilityIndex = observer(function FacilityIndex() {
  const [searchParams,setSearchParams] = useSearchParams();

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
      <AdminTitleBar title="Facilities" />
      <StandardTableWrap<FacilityModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100svh-var(--warning-bar,0px)-var(--title-bar,175px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"

        newComponent={() => {
          LayerService.add(
            FacilityFormModalId,
            FacilityFormModal,
            {onSave: () => applyFilters({...appliedFilters})},
          );
        }}
        columns={columns}
        statuses={status}
        modelType="facility"
        filters={filters}
        applyFilters={applyFilters}
        appliedFilters={appliedFilters}
        selectRows={true}
        tableSearch={true}
        tableExport={true}
 hideTotalRow={true}
infiniteScroll={true}
        massActions={[
          (props) => <DefaultMassActions {...props} />,
        ]}
      />
    </>
  );
});

