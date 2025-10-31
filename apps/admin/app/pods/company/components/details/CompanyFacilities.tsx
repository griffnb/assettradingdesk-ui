import ServerTableWrap from "@/common_lib/components/table/ServerTableWrap";
import { columns } from "@/pods/facility/columns";
import { filters } from "@/pods/facility/filters";
import FacilityModel from "@/pods/facility/model/FacilityModel";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import { useState } from "react";
import CompanyModel from "../../model/CompanyModel";

interface CompanyFacilitiesProps {
  company: CompanyModel;
}
export const CompanyFacilities = observer((props: CompanyFacilitiesProps) => {
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
        <div className="flex flex-grow">Facilities</div>
      </h1>
      <ServerTableWrap<FacilityModel>
        newRoute={`/facilities/new?company_id=${props.company.id}`}
        columns={columns}
        statuses={constants.facility.status}
        modelType="facility"
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

export default CompanyFacilities;
