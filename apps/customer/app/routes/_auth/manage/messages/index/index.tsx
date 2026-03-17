import { useAccount } from "@/common_lib/authentication/useAccount";
import { MessagesIndex } from "@/ui/customer/messages/v2/MessagesIndex";
import { observer } from "mobx-react-lite";

export default observer(function Messages() {
  const { account } = useAccount();
  if (!account) {
    return null;
  }
  return <MessagesIndex account={account} />;
});
