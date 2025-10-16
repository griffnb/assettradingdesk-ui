import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AssetFileIndex }  from "@/admin/pods/asset_file/pages/AssetFileIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AssetFileIndex />;
});
