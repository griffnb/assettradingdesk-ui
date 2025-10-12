import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AssetIndex }  from "@/admin/pods/asset/pages/AssetIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AssetIndex />;
});
