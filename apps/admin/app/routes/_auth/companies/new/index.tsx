import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { CompanyNew } from "@/admin/pods/company/pages/CompanyNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <CompanyNew />;
});
