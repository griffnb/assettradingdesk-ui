import { NotificationService } from "@/common_lib/services/NotificationService";
import { SessionService } from "@/common_lib/services/SessionService";

import { AccountService } from "@/models/models/account/services/AccountService";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { observer } from "mobx-react-lite";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

export const VerifyEmailPage = observer(function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyToken = searchParams.get("verify");
    const email = searchParams.get("email");

    if (verifyToken) {
      AccountService.verifyAccount(
        verifyToken,
        email || "",
      ).then((response) => {
        if (response.success && response.data) {
          if (response.data.token && response.data.token != "") {
            SessionService.setSessionToken(response.data.token);
          }
          SessionService.loadAccount(true).then(() => {
            if (response?.data?.redirect_url) {
              navigate(response.data.redirect_url);
              NotificationService.addSuccess("Email verified successfully");
              return;
            }
            navigate("/");
          });
        }
      });
    }
  }, [navigate, searchParams]);

  return <LoadingSkeleton />;
});

export default VerifyEmailPage;
