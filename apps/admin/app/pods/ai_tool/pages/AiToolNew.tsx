import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { AiToolForm  } from "@/admin/pods/ai_tool/components/AiToolForm";
import { AiToolModel } from "@/models/models/ai_tool/model/AiToolModel";

//interface AiToolNewProps {}

export const AiToolNew = observer(function AiToolNew() {
  const [record, setRecord] = useState<AiToolModel | null>(null);

  useEffect(() => {
    const rec = Store.ai_tool.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New AiTool" />
      <AiToolForm record={record} />;
    </>
  );
});
