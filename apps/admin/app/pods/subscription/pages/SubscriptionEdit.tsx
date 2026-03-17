import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { SubscriptionForm } from "@/admin/pods/subscription/components/SubscriptionForm";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface SubscriptionEditProps {}

export const SubscriptionEdit = observer(function SubscriptionEdit() {
  const [record, setRecord] = useState<SubscriptionModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.subscription.get(id as string).then(
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
      { label: "Subscriptions", href: "/subscriptions" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <SubscriptionForm record={record} />
    </>
  );
});
