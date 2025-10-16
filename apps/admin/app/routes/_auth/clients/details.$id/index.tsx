import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ClientDetails } from "@/admin/pods/client/pages/ClientDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <ClientDetails />;
});
