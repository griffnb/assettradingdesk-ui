import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { ManufacturerForm  } from "@/admin/pods/manufacturer/components/ManufacturerForm";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";

//interface ManufacturerNewProps {}

export const ManufacturerNew = observer(function ManufacturerNew() {
  const [record, setRecord] = useState<ManufacturerModel | null>(null);

  useEffect(() => {
    const rec = Store.manufacturer.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Manufacturers", href: "/manufacturers" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <ManufacturerForm record={record} />;
    </>
  );
});
