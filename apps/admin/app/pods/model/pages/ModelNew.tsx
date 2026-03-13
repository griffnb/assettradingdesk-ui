import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { ModelForm  } from "@/admin/pods/model/components/ModelForm";
import { ModelModel } from "@/models/models/model/model/ModelModel";

//interface ModelNewProps {}

export const ModelNew = observer(function ModelNew() {
  const [record, setRecord] = useState<ModelModel | null>(null);

  useEffect(() => {
    const rec = Store.model.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Models", href: "/models" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <ModelForm record={record} />;
    </>
  );
});
