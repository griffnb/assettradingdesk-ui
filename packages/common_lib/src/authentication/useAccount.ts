import { SessionService } from "@/common_lib/services/SessionService";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface UseAccountOptions {
  force?: boolean;
  redirectLocation?: string;
}

export const useAccount = ({
  force,
  redirectLocation,
}: UseAccountOptions = {}) => {
  const [accountLoading, setAccountLoading] = useState(true); // Indicates if the auth check is in progress
  const nav = useNavigate();
  useEffect(() => {
    SessionService.loadAccount(force).then((account) => {
      if (!account) {
        setAccountLoading(false); // Auth check is complete
        if (redirectLocation) {
          nav(redirectLocation);
        }
        return;
      }

      setAccountLoading(false); // Auth check is complete
    });
  }, [SessionService.isAuthenticated, force]);

  return { account: SessionService.account, accountLoading };
};
