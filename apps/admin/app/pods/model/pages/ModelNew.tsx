import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { ModelForm  } from "@/admin/pods/model/components/ModelForm";
import { ModelModel } from "@/models/models/model/model/ModelModel";

//interface ModelNewProps {}

export const ModelNew = observer(function ModelNew() {
  const [record, setRecord] = useState<ModelModel | null>(null);

  useEffect(() => {
    const rec = Store.model.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Model" />
      <ModelForm record={record} />;
    </>
  );
});
