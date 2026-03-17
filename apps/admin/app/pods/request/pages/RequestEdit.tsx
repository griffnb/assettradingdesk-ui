import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { RequestForm } from "@/admin/pods/request/components/RequestForm";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface RequestEditProps {}

export const RequestEdit = observer(function RequestEdit() {
  const [record, setRecord] = useState<RequestModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.request.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Requests", href: "/requests" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <RequestForm record={record} />;
    </>
  );
});
