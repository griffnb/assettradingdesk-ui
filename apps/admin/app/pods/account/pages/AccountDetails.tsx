import { AccountModel } from "@/models/models/account/model/AccountModel";
import { Store } from "@/models/store/Store";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AccountInfo } from "../components/details/AccountInfo";

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

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Accounts", href: "/accounts" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <AccountInfo account={record} />
    </>
  );
});
