import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { SubscriptionNew } from "@/admin/pods/subscription/pages/SubscriptionNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <SubscriptionNew />;
});
