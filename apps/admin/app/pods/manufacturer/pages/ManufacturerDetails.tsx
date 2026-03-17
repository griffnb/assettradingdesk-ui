import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Store } from "@/models/store/Store";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ManufacturerInfo } from "../components/details/ManufacturerInfo";

//interface ManufacturerDetailProps {}

export const ManufacturerDetails = observer(function ManufacturerDetails() {
  const [record, setRecord] = useState<ManufacturerModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    Store.manufacturer.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Manufacturers", href: "/manufacturers" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <ManufacturerInfo manufacturer={record} />
    </>
  );
});
