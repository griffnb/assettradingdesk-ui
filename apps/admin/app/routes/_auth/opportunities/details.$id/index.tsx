import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { OpportunityDetails } from "@/admin/pods/opportunity/pages/OpportunityDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <OpportunityDetails />;
});
