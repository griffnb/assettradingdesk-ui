import { SessionService } from "@/common_lib/services/SessionService";

import { AccountModel } from "@/models/models/account/model/AccountModel";
import { useEffect, useState } from "react";

export const useAccount = (force?: boolean) => {
  const [account, setAccount] = useState<AccountModel | null>(null);
  const [accountLoading, setAccountLoading] = useState(true); // Indicates if the auth check is in progress
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const authStatus = SessionService.isAuthenticated; // Assuming `isAuthenticated` is a getter or method
    if (!authStatus) {
      // We don't need to set `isAuthenticated` here as we're redirecting
      setAccountLoading(false); // Auth check is complete
      setAccount(null);
    } else {
      if (force) {
        SessionService.loadAccount(force).then((account) => {
          if (!account) {
            setAccountLoading(false); // Auth check is complete
            setAccount(null);

            return;
          }
          setAccount(account); // User is authenticated
          setAccountLoading(false); // Auth check is complete
          setLoadTime(SessionService.loadTime);
        });
      } else {
        //Blocks until the user is fetched
        SessionService.fetchAccount().then((account) => {
          if (!account) {
            setAccountLoading(false); // Auth check is complete
            setAccount(null);
            return;
          }
          setAccount(account); // User is authenticated
          setAccountLoading(false); // Auth check is complete
          setLoadTime(SessionService.loadTime);
        });
      }
    }
  }, [SessionService.isAuthenticated, force]);

  useEffect(() => {
    if (accountLoading) {
      return;
    }

    if (SessionService.loadTime != loadTime) {
      SessionService.fetchAccount().then((account) => {
        if (!account) {
          setAccountLoading(false); // Auth check is complete
          setAccount(null);
          return;
        }
        setAccount(account); // User is authenticated
        setAccountLoading(false); // Auth check is complete
        setLoadTime(SessionService.loadTime);
      });
    }
  }, [SessionService.loadTime, accountLoading]);

  return { account, accountLoading };
};
