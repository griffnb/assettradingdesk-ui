import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { CompanyEdit } from "@/admin/pods/company/pages/CompanyEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <CompanyEdit />;
});
