import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { SubscriptionForm } from "@/admin/pods/subscription/components/SubscriptionForm";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

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

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Subscription" objectURN={record.urn} />
      <SubscriptionForm record={record} />
    </>
  );
});
