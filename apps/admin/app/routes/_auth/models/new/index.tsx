import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ModelNew } from "@/admin/pods/model/pages/ModelNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <ModelNew />;
});
