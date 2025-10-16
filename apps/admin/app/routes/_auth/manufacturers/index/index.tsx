import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ManufacturerIndex }  from "@/admin/pods/manufacturer/pages/ManufacturerIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <ManufacturerIndex />;
});
