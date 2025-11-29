import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { SubscriptionForm  } from "@/admin/pods/subscription/components/SubscriptionForm";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";

//interface SubscriptionNewProps {}

export const SubscriptionNew = observer(function SubscriptionNew() {
  const [record, setRecord] = useState<SubscriptionModel | null>(null);

  useEffect(() => {
    const rec = Store.subscription.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Subscription" />
      <SubscriptionForm record={record} />
    </>
  );
});
