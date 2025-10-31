import { columns } from "@/admin/pods/client/columns";
import { filters } from "@/admin/pods/client/filters";
import { constants } from "@/models/constants";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface CompanyClientsProps {
  company: CompanyModel;
}
export const CompanyClients = observer(function CompanyClients(
  props: CompanyClientsProps,
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
        <div className="flex grow">Clients</div>
      </h1>
      <StandardTableWrap<ClientModel>
        newComponent={`/clients/new?company_id=${props.company.id}`}
        columns={columns}
        statuses={constants.client.status}
        modelType="client"
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
