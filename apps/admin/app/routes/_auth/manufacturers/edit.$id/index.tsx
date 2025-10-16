import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ManufacturerEdit } from "@/admin/pods/manufacturer/pages/ManufacturerEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <ManufacturerEdit />;
});
