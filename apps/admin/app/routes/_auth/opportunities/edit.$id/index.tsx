import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { OpportunityEdit } from "@/admin/pods/opportunity/pages/OpportunityEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <OpportunityEdit />;
});
