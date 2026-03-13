import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { RequestForm  } from "@/admin/pods/request/components/RequestForm";
import { RequestModel } from "@/models/models/request/model/RequestModel";

//interface RequestNewProps {}

export const RequestNew = observer(function RequestNew() {
  const [record, setRecord] = useState<RequestModel | null>(null);

  useEffect(() => {
    const rec = Store.request.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Requests", href: "/requests" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <RequestForm record={record} />;
    </>
  );
});
