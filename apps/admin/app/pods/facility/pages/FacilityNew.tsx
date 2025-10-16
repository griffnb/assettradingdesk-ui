import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { FacilityForm  } from "@/admin/pods/facility/components/FacilityForm";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";

//interface FacilityNewProps {}

export const FacilityNew = observer(function FacilityNew() {
  const [record, setRecord] = useState<FacilityModel | null>(null);

  useEffect(() => {
    const rec = Store.facility.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Facility" />
      <FacilityForm record={record} />;
    </>
  );
});
