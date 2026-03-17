import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { PipelineForm  } from "@/admin/pods/pipeline/components/PipelineForm";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";

//interface PipelineNewProps {}

export const PipelineNew = observer(function PipelineNew() {
  const [record, setRecord] = useState<PipelineModel | null>(null);

  useEffect(() => {
    const rec = Store.pipeline.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Pipelines", href: "/pipelines" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <PipelineForm record={record} />;
    </>
  );
});
