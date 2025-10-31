import { ClientModel } from "@/models/models/client/model/ClientModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ClientAssets } from "../components/details/ClientAssets";
import { ClientInfo } from "../components/details/ClientInfo";
import { ClientRequests } from "../components/details/ClientRequests";

//interface ClientDetailProps {}

export const ClientDetails = observer(function ClientDetails() {
  const [record, setRecord] = useState<ClientModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.client.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Client" />
      <ClientInfo client={record} />
      <ClientAssets client={record} />
      <ClientRequests client={record} />
    </>
  );
});
