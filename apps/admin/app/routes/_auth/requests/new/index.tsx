import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { RequestNew } from "@/admin/pods/request/pages/RequestNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <RequestNew />;
});
