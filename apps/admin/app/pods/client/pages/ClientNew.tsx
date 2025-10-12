import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { ClientForm  } from "@/admin/pods/client/components/ClientForm";
import { ClientModel } from "@/models/models/client/model/ClientModel";

//interface ClientNewProps {}

export const ClientNew = observer(function ClientNew() {
  const [record, setRecord] = useState<ClientModel | null>(null);

  useEffect(() => {
    const rec = Store.client.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Client" />
      <ClientForm record={record} />;
    </>
  );
});
