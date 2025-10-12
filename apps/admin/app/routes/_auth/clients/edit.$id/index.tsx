import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ClientEdit } from "@/admin/pods/client/pages/ClientEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <ClientEdit />;
});
