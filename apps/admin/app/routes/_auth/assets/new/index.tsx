import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AssetNew } from "@/admin/pods/asset/pages/AssetNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AssetNew />;
});
