import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ModelDetails } from "@/admin/pods/model/pages/ModelDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <ModelDetails />;
});
