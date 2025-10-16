import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { ManufacturerForm } from "@/admin/pods/manufacturer/components/ManufacturerForm";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

//interface ManufacturerEditProps {}

export const ManufacturerEdit = observer(function ManufacturerEdit() {
  const [record, setRecord] = useState<ManufacturerModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.manufacturer.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Manufacturer" objectURN={record.urn} />
      <ManufacturerForm record={record} />;
    </>
  );
});
