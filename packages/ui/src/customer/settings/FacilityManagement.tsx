"use client";

import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { CompactServerTable } from "@/ui/common/components/table/CompactServerTable";
import { IColumn } from "@/ui/common/components/types/columns";
import { Button } from "@/ui/shadcn/ui/button";
import { Building2, Plus } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const handleNewFacility = () => {
    navigate("/manage/facilities/new");
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="size-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Facilities</h1>
            <p className="text-sm text-muted-foreground">
              Manage your organization&apos;s facilities
            </p>
          </div>
        </div>
        <Button onClick={handleNewFacility} className="gap-2">
          <Plus className="size-4" />
          New Facility
        </Button>
      </div>

      <CompactServerTable<FacilityModel>
        title="All Facilities"
        columns={columns}
        modelType="facility"
        infiniteScroll={false}
      />
    </div>
  );
});
