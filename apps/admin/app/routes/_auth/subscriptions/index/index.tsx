import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { SubscriptionIndex }  from "@/admin/pods/subscription/pages/SubscriptionIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <SubscriptionIndex />;
});
