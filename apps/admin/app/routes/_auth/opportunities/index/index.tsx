import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { OpportunityIndex }  from "@/admin/pods/opportunity/pages/OpportunityIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <OpportunityIndex />;
});
