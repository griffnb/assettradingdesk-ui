import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AssetDetails } from "@/admin/pods/asset/pages/AssetDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <AssetDetails />;
});
