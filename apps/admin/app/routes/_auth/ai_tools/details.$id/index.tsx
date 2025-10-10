import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AiToolDetails } from "@/admin/pods/ai_tool/pages/AiToolDetails";
import { observer } from "mobx-react";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <AiToolDetails />;
});
