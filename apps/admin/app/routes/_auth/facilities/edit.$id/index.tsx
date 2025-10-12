import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { FacilityEdit } from "@/admin/pods/facility/pages/FacilityEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <FacilityEdit />;
});
