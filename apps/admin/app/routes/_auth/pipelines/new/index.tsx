import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { PipelineNew } from "@/admin/pods/pipeline/pages/PipelineNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <PipelineNew />;
});
