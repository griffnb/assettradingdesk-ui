import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { FacilityForm } from "@/admin/pods/facility/components/FacilityForm";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

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

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Facility" objectURN={record.urn} />
      <FacilityForm record={record} />;
    </>
  );
});
