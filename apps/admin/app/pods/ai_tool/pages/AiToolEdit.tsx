import { Store } from "@/models/store/Store";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { AiToolForm } from "@/admin/pods/ai_tool/components/AiToolForm";
import { AiToolModel } from "@/models/models/ai_tool/model/AiToolModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

//interface AiToolEditProps {}

export const AiToolEdit = observer(function AiToolEdit() {
  const [record, setRecord] = useState<AiToolModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.ai_tool.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit AiTool" objectURN={record.urn} />
      <AiToolForm record={record} />;
    </>
  );
});
