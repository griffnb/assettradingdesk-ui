import { BillingPlanDetails } from "@/admin/pods/billing_plan/pages/BillingPlanDetails";
import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <BillingPlanDetails />;
});
