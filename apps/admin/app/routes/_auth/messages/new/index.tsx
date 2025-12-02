import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { MessageNew } from "@/admin/pods/message/pages/MessageNew";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <MessageNew />;
});
