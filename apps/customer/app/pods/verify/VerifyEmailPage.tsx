import { NotificationService } from "@/common_lib/services/NotificationService";
import { SessionService } from "@/common_lib/services/SessionService";

import { AccountService } from "@/models/models/account/services/AccountService";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const VerifyEmailPage = observer(function VerifyEmailPage() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.verify) {
      AccountService.verifyAccount(
        router.query.verify as string,
        (router.query.email as string) || "",
      ).then((response) => {
        if (response.success && response.data) {
          if (response.data.token && response.data.token != "") {
            SessionService.setSessionToken(response.data.token);
          }
          SessionService.loadAccount(true).then(() => {
            if (response?.data?.redirect_url) {
              router.push(response.data.redirect_url);
              NotificationService.addSuccess("Email verified successfully");
              return;
            }
            router.push("/");
          });
        }
      });
    }
  }, [router, router.query.verify, router.query.email]);

  return <LoadingSkeleton />;
});

export default VerifyEmailPage;
