import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { IndustryIndex }  from "@/admin/pods/industry/pages/IndustryIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <IndustryIndex />;
});
