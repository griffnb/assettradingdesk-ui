import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { PipelineIndex }  from "@/admin/pods/pipeline/pages/PipelineIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <PipelineIndex />;
});
