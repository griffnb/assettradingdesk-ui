import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AssetEdit } from "@/admin/pods/asset/pages/AssetEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AssetEdit />;
});
