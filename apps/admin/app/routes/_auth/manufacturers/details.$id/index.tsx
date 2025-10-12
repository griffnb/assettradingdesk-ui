import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ManufacturerDetails } from "@/admin/pods/manufacturer/pages/ManufacturerDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <ManufacturerDetails />;
});
