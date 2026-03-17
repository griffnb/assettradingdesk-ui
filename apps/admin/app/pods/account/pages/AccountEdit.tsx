import { AccountForm } from "@/admin/pods/account/components/AccountForm";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { Store } from "@/models/store/Store";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
//interface AccountEditProps {}
export const AccountEdit = observer(function AccountEdit() {
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
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <AccountForm record={record} />;
    </>
  );
});
