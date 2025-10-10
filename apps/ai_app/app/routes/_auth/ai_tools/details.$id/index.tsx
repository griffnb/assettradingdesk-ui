import { AiToolDetails } from "@/ai_app/pods/ai_tool/pages/AiToolDetails";
import { useAccount } from "@/common_lib/authentication/useAccount";
import { observer } from "mobx-react";

export default observer(() => {
  const { account, accountLoading } = useAccount();
  if (accountLoading || !account) {
    return null;
  }

  return <AiToolDetails />;
});
