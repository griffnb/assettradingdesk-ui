import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { RequestEdit } from "@/admin/pods/request/pages/RequestEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <RequestEdit />;
});
