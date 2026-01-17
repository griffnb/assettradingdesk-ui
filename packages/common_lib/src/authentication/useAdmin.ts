import { SessionService } from "@/common_lib/services/SessionService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type UseAdminProps = {
  minRole?: number;
  redirectLocation?: string;
  checkOnly?: boolean;
  force?: boolean;
};

export const useAdmin = (props?: UseAdminProps) => {
  const [adminLoading, setAdminLoading] = useState(true); // Indicates if the auth check is in progress
  const nav = useNavigate();
  useEffect(() => {
    //Blocks until the user is fetched
    SessionService.fetchAdmin(props?.force).then((admin) => {
      if (!admin) {
        setAdminLoading(false); // Auth check is complete
        if (!props?.checkOnly) {
          nav(props?.redirectLocation || "/login");
        }
        return;
      }
      setAdminLoading(false); // Auth check is complete
      if (props?.minRole && admin.role && admin.role < props.minRole) {
        if (!props?.checkOnly) {
          nav(props?.redirectLocation || "/login");
        }
      }
    });
  }, [props?.force, SessionService.admin]);

  return { admin: SessionService.admin, adminLoading };
};
