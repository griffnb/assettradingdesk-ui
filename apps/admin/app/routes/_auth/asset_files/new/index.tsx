import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AssetFileNew } from "@/admin/pods/asset_file/pages/AssetFileNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AssetFileNew />;
});
