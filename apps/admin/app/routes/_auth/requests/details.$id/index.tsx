import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { RequestDetails } from "@/admin/pods/request/pages/RequestDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <RequestDetails />;
});
