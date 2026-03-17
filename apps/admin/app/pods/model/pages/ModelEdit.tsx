import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { ModelForm } from "@/admin/pods/model/components/ModelForm";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface ModelEditProps {}

export const ModelEdit = observer(function ModelEdit() {
  const [record, setRecord] = useState<ModelModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.model.get(id as string).then(
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
      { label: "Models", href: "/models" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <ModelForm record={record} />;
    </>
  );
});
