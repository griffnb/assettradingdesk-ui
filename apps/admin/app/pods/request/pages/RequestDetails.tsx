import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RequestInfo } from "../components/details/RequestInfo";
import { RequestMatches } from "../components/details/RequestMatches";

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

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Request" />
      <RequestMatches request={record} />
      <RequestInfo request={record} />
    </>
  );
});
