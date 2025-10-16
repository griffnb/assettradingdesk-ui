import {StandardTableWrap} from "@/ui/common/components/table/StandardTableWrap";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { LayerService } from "@/common_lib/services/LayerService";
import {
  PipelineFormModal,
  PipelineFormModalId,
} from "../components/PipelineFormModal";
import { useSearchParams } from "react-router";
import DefaultMassActions from "@/ui/common/components/table/nav/DefaultMassActions";
import { MassActionProps } from "@/ui/common/components/types/mass-actions";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { status } from "@/models/models/pipeline/_constants/status";
import { columns } from "../columns";
import { filters } from "../filters";
import { useMemo } from "react";



export const PipelineIndex = observer(function PipelineIndex() {
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
      <AdminTitleBar title="Pipelines" />
      <StandardTableWrap<PipelineModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100svh-var(--warning-bar,0px)-var(--title-bar,175px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"

        newComponent={() => {
          LayerService.add(
            PipelineFormModalId,
            PipelineFormModal,
            {onSave: () => applyFilters({...appliedFilters})},
          );
        }}
        columns={columns}
        statuses={status}
        modelType="pipeline"
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

