import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { FacilityNew } from "@/admin/pods/facility/pages/FacilityNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <FacilityNew />;
});
