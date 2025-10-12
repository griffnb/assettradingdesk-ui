import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { FacilityIndex }  from "@/admin/pods/facility/pages/FacilityIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <FacilityIndex />;
});
