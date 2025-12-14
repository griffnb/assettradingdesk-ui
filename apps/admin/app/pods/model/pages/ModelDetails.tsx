import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
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

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Model" />
      <ModelInfo model={record} />
    </>
  );
});
