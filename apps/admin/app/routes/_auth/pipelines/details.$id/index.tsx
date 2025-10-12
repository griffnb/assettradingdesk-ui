import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { PipelineDetails } from "@/admin/pods/pipeline/pages/PipelineDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <PipelineDetails />;
});
