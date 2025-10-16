import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { OrganizationEdit } from "@/admin/pods/organization/pages/OrganizationEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <OrganizationEdit />;
});
