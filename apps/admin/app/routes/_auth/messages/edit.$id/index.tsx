import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { MessageEdit } from "@/admin/pods/message/pages/MessageEdit";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <MessageEdit />;
});
