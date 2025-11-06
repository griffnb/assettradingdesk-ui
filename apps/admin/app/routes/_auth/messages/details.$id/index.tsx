import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { MessageDetails } from "@/admin/pods/message/pages/MessageDetails";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }


  return <MessageDetails />;
});
