import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { IndustryNew } from "@/admin/pods/industry/pages/IndustryNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <IndustryNew />;
});
