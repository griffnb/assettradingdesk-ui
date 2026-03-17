import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { FacilityForm } from "@/admin/pods/facility/components/FacilityForm";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface FacilityEditProps {}

export const FacilityEdit = observer(function FacilityEdit() {
  const [record, setRecord] = useState<FacilityModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.facility.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Facilities", href: "/facilities" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <FacilityForm record={record} />;
    </>
  );
});
