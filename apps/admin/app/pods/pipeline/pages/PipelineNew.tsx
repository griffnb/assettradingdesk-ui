import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { PipelineForm  } from "@/admin/pods/pipeline/components/PipelineForm";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";

//interface PipelineNewProps {}

export const PipelineNew = observer(function PipelineNew() {
  const [record, setRecord] = useState<PipelineModel | null>(null);

  useEffect(() => {
    const rec = Store.pipeline.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Pipeline" />
      <PipelineForm record={record} />;
    </>
  );
});
