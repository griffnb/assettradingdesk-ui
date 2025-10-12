import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { IndustryEdit } from "@/admin/pods/industry/pages/IndustryEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <IndustryEdit />;
});
