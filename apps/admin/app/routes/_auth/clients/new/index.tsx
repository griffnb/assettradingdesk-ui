import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ClientNew } from "@/admin/pods/client/pages/ClientNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <ClientNew />;
});
