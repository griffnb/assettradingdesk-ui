import { filters } from "@/admin/pods/request/filters";
import { constants } from "@/models/constants";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { columns } from "../../../request/columns";

interface ClientRequestsProps {
  client: ClientModel;
}
export const ClientRequests = observer(function ClientRequests(
  props: ClientRequestsProps,
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
        <div className="flex grow">Requests</div>
      </h1>
      <StandardTableWrap<RequestModel>
        newComponent={`/requests/new?client_id=${props.client.id}`}
        columns={columns}
        statuses={constants.request.status}
        modelType="request"
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
