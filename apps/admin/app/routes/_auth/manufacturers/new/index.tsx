import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ManufacturerNew } from "@/admin/pods/manufacturer/pages/ManufacturerNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <ManufacturerNew />;
});
