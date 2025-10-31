import { columns } from "@/admin/pods/request/columns";
import { filters } from "@/admin/pods/request/filters";
import { constants } from "@/models/constants";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface CompanyRequestsProps {
  company: CompanyModel;
}
export const CompanyRequests = observer(function CompanyRequests(
  props: CompanyRequestsProps,
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
        <div className="flex grow">Requests</div>
      </h1>
      <StandardTableWrap<RequestModel>
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
