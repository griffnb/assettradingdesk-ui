import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { ManufacturerForm } from "@/admin/pods/manufacturer/components/ManufacturerForm";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

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

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Manufacturers", href: "/manufacturers" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <ManufacturerForm record={record} />;
    </>
  );
});
