import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { IndustryDetails } from "@/admin/pods/industry/pages/IndustryDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <IndustryDetails />;
});
