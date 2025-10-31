import { columns } from "@/admin/pods/facility/columns";
import { filters } from "@/admin/pods/facility/filters";
import { constants } from "@/models/constants";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface CompanyFacilitiesProps {
  company: CompanyModel;
}
export const CompanyFacilities = observer(function CompanyFacilities(
  props: CompanyFacilitiesProps,
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
        <div className="flex grow">Facilities</div>
      </h1>
      <StandardTableWrap<FacilityModel>
        newComponent={`/facilities/new?company_id=${props.company.id}`}
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
