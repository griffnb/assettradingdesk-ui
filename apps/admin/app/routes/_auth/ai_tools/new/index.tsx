import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AiToolNew } from "@/admin/pods/ai_tool/pages/AiToolNew";
import { observer } from "mobx-react";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AiToolNew />;
});
