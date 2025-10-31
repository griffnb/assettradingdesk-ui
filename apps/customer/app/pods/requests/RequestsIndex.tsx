import { LayerService } from "@/common_lib/services/LayerService";
import { status } from "@/models/models/request/_constants/status";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { columns } from "./columns";
import {
  RequestFormModal,
  RequestFormModalId,
} from "./components/RequestFormModal";
import { filters } from "./filters";

export const RequestsIndex = observer(function RequestsIndex() {
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
      <StandardTableWrap<RequestModel>
        className="[&_*[data-slot='table-wrap']]:h-[calc(100svh-var(--warning-bar,0px)-var(--title-bar,175px))] [&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={() => {
          LayerService.add(RequestFormModalId, RequestFormModal, {
            onSave: () => {
              LayerService.remove(RequestFormModalId);
              applyFilters({ ...appliedFilters });
            },
            onCancel: () => {
              LayerService.remove(RequestFormModalId);
            },
          });
        }}
        columns={columns}
        statuses={status}
        modelType="request"
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
