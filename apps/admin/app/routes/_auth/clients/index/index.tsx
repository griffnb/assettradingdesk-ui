import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ClientIndex }  from "@/admin/pods/client/pages/ClientIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <ClientIndex />;
});
