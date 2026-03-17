import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { FacilityForm  } from "@/admin/pods/facility/components/FacilityForm";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";

//interface FacilityNewProps {}

export const FacilityNew = observer(function FacilityNew() {
  const [record, setRecord] = useState<FacilityModel | null>(null);

  useEffect(() => {
    const rec = Store.facility.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Facilities", href: "/facilities" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <FacilityForm record={record} />;
    </>
  );
});
