import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { SubscriptionForm  } from "@/admin/pods/subscription/components/SubscriptionForm";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";

//interface SubscriptionNewProps {}

export const SubscriptionNew = observer(function SubscriptionNew() {
  const [record, setRecord] = useState<SubscriptionModel | null>(null);

  useEffect(() => {
    const rec = Store.subscription.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Subscriptions", href: "/subscriptions" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <SubscriptionForm record={record} />
    </>
  );
});
