"use client";

import {
  parseSearchParams,
  queryToFilters,
} from "@/common_lib/utils/query/builder";
import { constants } from "@/models/constants";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { StandardTableWrap } from "@/ui/common/components/table/StandardTableWrap";
import { IColumn } from "@/ui/common/components/types/columns";
import { Button } from "@/ui/shadcn/ui/button";
import { Building2Icon, PlusIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";

const columns: IColumn<FacilityModel>[] = [
  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
  {
    title: "Country",
    field: "country",
    queryField: "country",
  },
  {
    title: "Phone",
    field: "phone",
    queryField: "phone",
    noSort: true,
  },
  {
    title: "Description",
    field: "description",
    queryField: "description",
    noSort: true,
  },
];

export const FacilityManagement = observer(function FacilityManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const handleNewFacility = () => {
    navigate("/manage/facilities/new");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <Building2Icon className="size-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Facilities</h1>
            <p className="text-sm text-muted-foreground">
              Manage your organization&apos;s facilities
            </p>
          </div>
        </div>
        <Button onClick={handleNewFacility} className="gap-2">
          <PlusIcon className="size-4" />
          New Facility
        </Button>
      </div>

      <StandardTableWrap<FacilityModel>
        className="[&_*[data-slot='table-wrap']]:flex-1 [&_*[data-slot='table-wrap']]:overflow-x-auto"
        columns={columns}
        statuses={constants.facility.status}
        modelType="facility"
        //customPath="manage"
        //filters={filters}
        applyFilters={applyFilters}
        appliedFilters={appliedFilters}
        selectRows={false}
        tableSearch={true}
        tableExport={true}
        hideTotalRow={true}
        infiniteScroll={true}
      />
    </div>
  );
});
