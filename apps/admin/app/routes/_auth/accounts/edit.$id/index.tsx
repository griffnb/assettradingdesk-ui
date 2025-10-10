import { AccountEdit } from "@/admin/pods/account/pages/AccountEdit";
import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AccountEdit />;
});
