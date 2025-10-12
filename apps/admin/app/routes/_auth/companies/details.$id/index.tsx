import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { CompanyDetails } from "@/admin/pods/company/pages/CompanyDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <CompanyDetails />;
});
