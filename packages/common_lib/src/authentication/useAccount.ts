import { SessionService } from "@/common_lib/services/SessionService";

import { useEffect, useState } from "react";

export const useAccount = (force?: boolean) => {
  const [accountLoading, setAccountLoading] = useState(true); // Indicates if the auth check is in progress
  useEffect(() => {
    SessionService.loadAccount(force).then((account) => {
      if (!account) {
        setAccountLoading(false); // Auth check is complete
        return;
      }

      setAccountLoading(false); // Auth check is complete
    });
  }, [SessionService.isAuthenticated, force]);

  return { account: SessionService.account, accountLoading };
};
