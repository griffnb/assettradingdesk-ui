import { LayerService } from "@/common_lib/services/LayerService";
import { status } from "@/models/models/request/_constants/status";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { cn } from "@/utils/cn";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo } from "react";
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

  const applyFilters = useCallback(
    (params: { [key: string]: string | string[] }) => {
      setSearchParams(params);
    },
    [setSearchParams],
  );

  const openNewRequest = useCallback(() => {
    LayerService.add(RequestFormModalId, RequestFormModal, {
      onSave: () => {
        LayerService.remove(RequestFormModalId);
        applyFilters({ ...appliedFilters, reload: "true" });
      },
      onCancel: () => {
        LayerService.remove(RequestFormModalId);
      },
    });
  }, [appliedFilters, applyFilters]);

  return (
    <div className={cn("relative flex h-full min-h-0 flex-1 flex-col")}>
      <StandardTableWrap<RequestModel>
        className="[&_*[data-slot='table-wrap']]:overflow-x-auto"
        newComponent={openNewRequest}
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
    </div>
  );
});
