import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { MessageIndex }  from "@/admin/pods/message/pages/MessageIndex";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <MessageIndex />;
});
