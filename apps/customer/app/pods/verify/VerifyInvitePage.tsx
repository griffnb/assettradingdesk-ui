import { SessionService } from "@/common_lib/services/SessionService";
import { Signup } from "@/models/models/account/model/Signup";
import { AccountService } from "@/models/models/account/services/AccountService";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { SetPasswordFields } from "@/ui/customer/password/SetPasswordFields";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export const VerifyInvitePage = observer(function VerifyInvitePage() {
  const [verified, setVerified] = useState<boolean>(false);
  const [signup, setSignup] = useState<Signup | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    if (searchParams.get("verify")) {
      const verify = searchParams.get("verify") as string;
      const email = searchParams.get("email") || "";
      AccountService.verifyInvite(verify, email).then((response) => {
        if (response.success && response.data) {
          if (response.data.token && response.data.token != "") {
            SessionService.setSessionToken(response.data.token);
          }
          setVerified(true);

          if (response.data.redirect_url) {
            nav(response.data.redirect_url);
            return;
          }

          Store.account.queryRecord("me", {}).then((resp) => {
            if (resp.success && resp.data) {
              const signup = new Signup();
              signup.email = resp.data.email as string;
              signup.first_name = resp.data.first_name as string;
              signup.last_name = resp.data.last_name as string;

              setSignup(signup);
            }
          });
        } else {
          nav("/");
        }
      });
    } else {
      nav("/");
    }
  }, [nav, searchParams]);

  const submitPassword = async () => {
    if (!signup) return;

    const result = await AccountService.setPassword({
      email: signup.email as string,
      password_confirmation: signup.password_confirmation,
      password: signup.password,
      verify: searchParams.get("verify") as string,
    });
    if (result.success) {
      nav("/");
    } else {
      setError(result.error);
    }
  };

  if (!verified || !signup) {
    return <LoadingSkeleton />;
  }

  const disabled = !isPasswordValid;

  return (
    <Card className="w-2/5 shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-center border-b pb-3">
          <img src="/img/logo.png" />
        </CardTitle>
        <CardDescription className="flex justify-center text-xl font-semibold text-text-neutral-primary">
          Create Your Account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="my-2 rounded-lg border border-red-500 bg-red-50 px-3 py-2 text-red-500">
            {error}
          </div>
        )}

        <SetPasswordFields
          record={signup}
          syncIsPasswordValid={(b) => setIsPasswordValid(b)}
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button onClick={submitPassword} className="w-full" disabled={disabled}>
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
});
