import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { OpportunitiesTable } from "../components/details/OpportunitiesTable";
import { PipelineInfo } from "../components/details/PipelineInfo";

//interface PipelineDetailProps {}

export const PipelineDetails = observer(function PipelineDetails() {
  const [record, setRecord] = useState<PipelineModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.pipeline.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Pipeline" />
      <PipelineInfo pipeline={record} />
      <OpportunitiesTable pipeline={record} />
    </>
  );
});
