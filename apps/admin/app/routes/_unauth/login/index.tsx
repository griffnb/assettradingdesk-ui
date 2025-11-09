import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { ServerService } from "@/common_lib/services/ServerService";
import { SessionService } from "@/common_lib/services/SessionService";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default observer(function Login() {
  const { admin, adminLoading } = useAdmin({ checkOnly: true });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ready, setReady] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!adminLoading) {
      if (admin) {
        nav("/");
      } else {
        setReady(true);
      }
    }
  }, [adminLoading, admin]);

  if (!ready) {
    return <Skeleton />;
  }

  const { getAccessTokenWithPopup } = useAuth0();

  const loginWithGoogle = async () => {
    try {
      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          connection: "google-oauth2",
        },
      });
      if (token) {
        const response = await ServerService.getRaw("/admin/tokenLogin", {
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
            nav("/home");
          }
        } else {
          setErrorMessage("Login failed. Please try again.");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!ready) {
    return null;
  }

  return (
    <div className="flex min-h-full flex-col bg-gray-100">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
          <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto w-auto"
              src="/img/logo_box.png"
              alt="Logo"
            />
          </div>
          {errorMessage ? (
            <div className="my-3 items-center rounded-md bg-error-200 px-6 py-2.5 text-center text-gray-700">
              {errorMessage}
            </div>
          ) : (
            ""
          )}

          <div>
            <button
              className="w-full rounded-md border border-blue-dark-500 bg-white px-2 py-3 font-semibold text-blue-dark-500"
              onClick={() => loginWithGoogle()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
