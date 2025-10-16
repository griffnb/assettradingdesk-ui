import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { RequestForm  } from "@/admin/pods/request/components/RequestForm";
import { RequestModel } from "@/models/models/request/model/RequestModel";

//interface RequestNewProps {}

export const RequestNew = observer(function RequestNew() {
  const [record, setRecord] = useState<RequestModel | null>(null);

  useEffect(() => {
    const rec = Store.request.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Request" />
      <RequestForm record={record} />;
    </>
  );
});
