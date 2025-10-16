import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { OpportunityNew } from "@/admin/pods/opportunity/pages/OpportunityNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <OpportunityNew />;
});
