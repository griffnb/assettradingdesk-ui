import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { PipelineEdit } from "@/admin/pods/pipeline/pages/PipelineEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <PipelineEdit />;
});
