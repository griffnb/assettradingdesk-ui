import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { CompanyIndex }  from "@/admin/pods/company/pages/CompanyIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <CompanyIndex />;
});
