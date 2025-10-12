import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { OrganizationNew } from "@/admin/pods/organization/pages/OrganizationNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <OrganizationNew />;
});
