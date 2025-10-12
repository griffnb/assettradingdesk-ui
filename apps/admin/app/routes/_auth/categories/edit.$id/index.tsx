import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { CategoryEdit } from "@/admin/pods/category/pages/CategoryEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <CategoryEdit />;
});
