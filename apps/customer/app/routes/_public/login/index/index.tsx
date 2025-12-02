import { useAccount } from "@/common_lib/authentication/useAccount";
import { ServerService } from "@/common_lib/services/ServerService";
import { SessionService } from "@/common_lib/services/SessionService";
import { Button } from "@/ui/shadcn/ui/button";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default observer(function Login() {
  const { account, accountLoading } = useAccount();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ready, setReady] = useState(false);
  const nav = useNavigate();
  const { getAccessTokenWithPopup } = useAuth0();

  useEffect(() => {
    if (!accountLoading) {
      if (account) {
        nav("/");
      } else {
        setReady(true);
      }
    }
  }, [accountLoading, account]);

  if (!ready) {
    return <Skeleton />;
  }

  const loginWithGoogle = async () => {
    try {
      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          connection: "google-oauth2",
        },
      });
      if (token) {
        const response = await ServerService.getRaw("/tokenLogin", {
          token: token,
        });

        if (response.success && response.data.token) {
          SessionService.setSessionToken(response.data.token);
          if (
            SessionService.redirectLocation &&
            SessionService.redirectLocation !== "/login"
          ) {
            nav(SessionService.redirectLocation);
            SessionService.setRedirectLocation(null);
          } else {
            nav("/");
          }
        } else {
          setErrorMessage("Login failed. Please try again.");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.log("render login");
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
          <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto w-auto" src="/img/logo.png" alt="Logo" />
          </div>
          {errorMessage ? (
            <div className="my-3 items-center rounded-md bg-error-200 px-6 py-2.5 text-center text-gray-700">
              {errorMessage}
            </div>
          ) : (
            ""
          )}

          <div>
            <Button
              onClick={() => loginWithGoogle()}
              variant={"default"}
              className="w-full"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
