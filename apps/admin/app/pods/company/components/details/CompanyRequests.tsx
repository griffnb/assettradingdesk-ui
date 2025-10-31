import ServerTableWrap from "@/common_lib/components/table/ServerTableWrap";
import { columns } from "@/pods/request/columns";
import { filters } from "@/pods/request/filters";
import RequestModel from "@/pods/request/model/RequestModel";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import { useState } from "react";
import CompanyModel from "../../model/CompanyModel";

interface CompanyRequestsProps {
  company: CompanyModel;
}
export const CompanyRequests = observer((props: CompanyRequestsProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    company_id: props.company.id?.toString() as string,
  });

  return (
    <div className="border-y-1 relative my-3 rounded-md bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex flex-grow">Requests</div>
      </h1>
      <ServerTableWrap<RequestModel>
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

export default CompanyRequests;
