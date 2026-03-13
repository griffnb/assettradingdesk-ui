import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { ClientForm } from "@/admin/pods/client/components/ClientForm";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

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

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Clients", href: "/clients" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <ClientForm record={record} />;
    </>
  );
});
