import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { SubscriptionEdit } from "@/admin/pods/subscription/pages/SubscriptionEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <SubscriptionEdit />;
});
