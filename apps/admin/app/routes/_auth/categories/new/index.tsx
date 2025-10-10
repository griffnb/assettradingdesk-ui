import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { CategoryNew } from "@/admin/pods/category/pages/CategoryNew";
import { observer } from "mobx-react";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <CategoryNew />;
});
