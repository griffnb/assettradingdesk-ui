import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { CategoryIndex }  from "@/admin/pods/category/pages/CategoryIndex";
import { observer } from "mobx-react";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <CategoryIndex />;
});
