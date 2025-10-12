import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { PipelineForm } from "@/admin/pods/pipeline/components/PipelineForm";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

//interface PipelineEditProps {}

export const PipelineEdit = observer(function PipelineEdit() {
  const [record, setRecord] = useState<PipelineModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.pipeline.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Pipeline" objectURN={record.urn} />
      <PipelineForm record={record} />;
    </>
  );
});
