import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
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

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Manufacturer" />
      <ManufacturerInfo manufacturer={record} />
    </>
  );
});
