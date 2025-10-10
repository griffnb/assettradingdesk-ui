import { useAccount } from "@/common_lib/authentication/useAccount";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "./ChatKitPanel";

export default observer(() => {
  const { account, accountLoading } = useAccount();

  

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  if (accountLoading || !account) {
    return null;
  }

  return (
    <ChatKitPanel
      onWidgetAction={handleWidgetAction}
      onResponseEnd={handleResponseEnd}
    />
  );
});
