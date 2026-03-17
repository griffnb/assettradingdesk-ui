import { SessionService } from "@/common_lib/services/SessionService";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router";

export default observer(() => {
  const [params] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    if (params.get("token")) {
      SessionService.clearSessionToken();
      SessionService.setSessionToken(params.get("token") as string);
    }
    if (params.get("redirect_url")) {
      nav(params.get("redirect_url") as string);
      return;
    }
    nav("/");
  }, [params.get("token"), params.get("redirect_url")]);
  return null;
});
