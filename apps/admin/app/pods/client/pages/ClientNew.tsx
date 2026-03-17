import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { ClientForm  } from "@/admin/pods/client/components/ClientForm";
import { ClientModel } from "@/models/models/client/model/ClientModel";

//interface ClientNewProps {}

export const ClientNew = observer(function ClientNew() {
  const [record, setRecord] = useState<ClientModel | null>(null);

  useEffect(() => {
    const rec = Store.client.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Clients", href: "/clients" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <ClientForm record={record} />;
    </>
  );
});
