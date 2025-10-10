import { AccountModel } from "@/models/models/account/model/AccountModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
//interface AccountDetailProps {}
export const AccountDetails = observer(function AccountDetails() {
  const [record, setRecord] = useState<AccountModel | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    Store.account.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Account" />
    </>
  );
});
