import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ModelIndex }  from "@/admin/pods/model/pages/ModelIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <ModelIndex />;
});
