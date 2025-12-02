import { SessionService } from "@/common_lib/services/SessionService";
import { debugLog } from "@/utils/debug";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type UseAuthProps = {
  minRole?: number;
  redirectLocation?: string;
};

export const useAuth = (props?: UseAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // Indicates if the auth check is in progress
  const nav = useNavigate();

  const redirectLocation = props?.redirectLocation || "/login";

  useEffect(() => {
    // Check if the user is authenticated

    //Blocks until the user is fetched
    SessionService.fetchAccount().then((user) => {
      if (!user) {
        SessionService.clearSessionToken(window.location.href);

        setAuthLoading(false); // Auth check is complete
        setIsAuthenticated(false); // User is not authenticated
        debugLog("User not found, redirecting to login");
        nav(redirectLocation);
        return;
      }
      if (props && props.minRole && user.role < props.minRole) {
        debugLog("User role is insufficient, redirecting to login");
        nav("/");
        return;
      }
      setIsAuthenticated(true); // User is authenticated
      setAuthLoading(false); // Auth check is complete
    });
  }, [props?.redirectLocation, props?.minRole, SessionService.isAuthenticated]);

  return { isAuthenticated, authLoading };
};
