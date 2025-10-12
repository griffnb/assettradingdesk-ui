import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { OrganizationIndex }  from "@/admin/pods/organization/pages/OrganizationIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <OrganizationIndex />;
});
