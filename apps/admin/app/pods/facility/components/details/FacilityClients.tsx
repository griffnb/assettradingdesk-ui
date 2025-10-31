import ServerTableWrap from "@/common_lib/components/table/ServerTableWrap";
import { columns } from "@/pods/client/columns";
import { filters } from "@/pods/client/filters";
import ClientModel from "@/pods/client/model/ClientModel";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import { useState } from "react";
import FacilityModel from "../../model/FacilityModel";

interface FacilityClientsProps {
  facility: FacilityModel;
}
const FacilityClients = observer((props: FacilityClientsProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    facility_id: props.facility.id?.toString() as string,
  });

  return (
    <div className="relative my-3 rounded-md border-y-1 bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex flex-grow">Clients</div>
      </h1>
      <ServerTableWrap<ClientModel>
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

export default FacilityClients;
