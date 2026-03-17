import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ModelInfo } from "../components/details/ModelInfo";

//interface ModelDetailProps {}

export const ModelDetails = observer(function ModelDetails() {
  const [record, setRecord] = useState<ModelModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    Store.model.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Models", href: "/models" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <ModelInfo model={record} />
    </>
  );
});
