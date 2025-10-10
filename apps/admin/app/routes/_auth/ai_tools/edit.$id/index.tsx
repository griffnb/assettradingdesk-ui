import { AiToolEdit } from "@/admin/pods/ai_tool/pages/AiToolEdit";
import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { observer } from "mobx-react";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AiToolEdit />;
});
