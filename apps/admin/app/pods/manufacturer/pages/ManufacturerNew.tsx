import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { ManufacturerForm  } from "@/admin/pods/manufacturer/components/ManufacturerForm";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";

//interface ManufacturerNewProps {}

export const ManufacturerNew = observer(function ManufacturerNew() {
  const [record, setRecord] = useState<ManufacturerModel | null>(null);

  useEffect(() => {
    const rec = Store.manufacturer.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Manufacturer" />
      <ManufacturerForm record={record} />;
    </>
  );
});
