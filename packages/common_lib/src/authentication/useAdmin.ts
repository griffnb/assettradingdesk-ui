import { SessionService } from "@/common_lib/services/SessionService";
import { AdminModel } from "@/models/models/admin/model/AdminModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
type UseAdminProps = {
  minRole?: number;
  redirectLocation?: string;
};

export const useAdmin = (props?: UseAdminProps) => {
  const [admin, setAdmin] = useState<AdminModel | null>(null);
  const [adminLoading, setAdminLoading] = useState(true); // Indicates if the auth check is in progress
  const nav = useNavigate();
  useEffect(() => {
    // Check if the user is authenticated
    const authStatus = SessionService.isAuthenticated; // Assuming `isAuthenticated` is a getter or method
    if (!authStatus) {
      // We don't need to set `isAuthenticated` here as we're redirecting
      setAdminLoading(false); // Auth check is complete
      setAdmin(null);

      nav(props?.redirectLocation || "/login");
    } else {
      //Blocks until the user is fetched
      SessionService.fetchAdmin().then((admin) => {
        if (!admin) {
          setAdminLoading(false); // Auth check is complete
          setAdmin(null);
          nav(props?.redirectLocation || "/login");
          return;
        }
        setAdmin(admin); // User is authenticated
        setAdminLoading(false); // Auth check is complete
        if (props?.minRole && admin.role && admin.role < props.minRole) {
          nav(props?.redirectLocation || "/login");
        }
      });
    }
  }, [SessionService.isAuthenticated]);

  return { admin, adminLoading };
};
