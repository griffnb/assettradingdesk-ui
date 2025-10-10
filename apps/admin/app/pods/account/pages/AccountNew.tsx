import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { AccountForm } from "@/admin/pods/account/components/AccountForm";
import { AccountModel } from "@/models/models/account/model/AccountModel";

//interface AccountNewProps {}

export const AccountNew = observer(() => {
  const [record, setRecord] = useState<AccountModel | null>(null);

  useEffect(() => {
    const rec = Store.account.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      
      <AccountForm record={record} />;
    </>
  );
});
