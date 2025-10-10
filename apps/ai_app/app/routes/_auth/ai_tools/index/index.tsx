import { AiToolIndex } from "@/ai_app/pods/ai_tool/pages/AiToolIndex";
import { useAccount } from "@/common_lib/authentication/useAccount";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const { account, accountLoading } = useAccount();
  if (accountLoading || !account) {
    return null;
  }

  return <AiToolIndex />;
});
