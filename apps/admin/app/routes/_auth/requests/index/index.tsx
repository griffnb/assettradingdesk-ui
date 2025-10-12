import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { RequestIndex }  from "@/admin/pods/request/pages/RequestIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <RequestIndex />;
});
