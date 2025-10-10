import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AiToolIndex }  from "@/admin/pods/ai_tool/pages/AiToolIndex";
import { observer } from "mobx-react";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <AiToolIndex />;
});
