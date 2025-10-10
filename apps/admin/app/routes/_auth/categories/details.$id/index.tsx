import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { CategoryDetails } from "@/admin/pods/category/pages/CategoryDetails";
import { observer } from "mobx-react";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <CategoryDetails />;
});
