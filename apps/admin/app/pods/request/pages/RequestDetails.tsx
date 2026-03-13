import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RequestInfo } from "../components/details/RequestInfo";
import { RequestMatches } from "../components/details/RequestMatches";
import { RequestOpportunities } from "../components/details/RequestOpportunities";

//interface RequestDetailProps {}

export const RequestDetails = observer(function RequestDetails() {
  const [record, setRecord] = useState<RequestModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.request.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Requests", href: "/requests" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <div className="flex flex-col gap-4">
        <RequestInfo request={record} />
        <RequestOpportunities request={record} />
        <RequestMatches request={record} />
      </div>
    </>
  );
});
