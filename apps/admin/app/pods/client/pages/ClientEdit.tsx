import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { ClientForm } from "@/admin/pods/client/components/ClientForm";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

//interface ClientEditProps {}

export const ClientEdit = observer(function ClientEdit() {
  const [record, setRecord] = useState<ClientModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.client.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Client" objectURN={record.urn} />
      <ClientForm record={record} />;
    </>
  );
});
