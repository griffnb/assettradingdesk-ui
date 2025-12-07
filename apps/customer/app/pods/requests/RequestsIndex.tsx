import { LayerService } from "@/common_lib/services/LayerService";
import { status } from "@/models/models/request/_constants/status";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { DefaultMassActions } from "@/ui/common/components/table/nav/DefaultMassActions";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import {
  RequestFormModal,
  RequestFormModalId,
} from "@/ui/customer/requests/RequestFormModal";
import {
  RequestSuggestions,
  RequestSuggestionsId,
} from "@/ui/customer/requests/RequestSuggestions";
import { Button } from "@/ui/shadcn/ui/button";
import { parseSearchParams, queryToFilters } from "@/utils/query/builder";
import { Book, Plus } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { columns } from "./columns";
import { filters } from "./filters";

export const RequestsIndex = observer(function RequestsIndex() {
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedFilters = useMemo(
    () =>
      queryToFilters(parseSearchParams(searchParams), {
        status: ["100"],
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
    LayerService.addOnly(RequestFormModalId, RequestFormModal, {
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
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <Book className="size-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Requests</h1>
            <p className="text-sm text-muted-foreground">
              Manage your requests
            </p>
          </div>
        </div>
        <Button onClick={openNewRequest} className="gap-2">
          <Plus className="size-4" />
          New Request
        </Button>
      </div>
      <StandardTableWrap<RequestModel>
        className="[&_*[data-slot='table-wrap']]:flex-1 [&_*[data-slot='table-wrap']]:overflow-x-auto"
        columns={columns}
        statuses={status}
        modelType="request"
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
          LayerService.addOnly({
            id: RequestSuggestionsId,
            component: RequestSuggestions,
            props: { record },
          });
        }}
      />
    </div>
  );
});
