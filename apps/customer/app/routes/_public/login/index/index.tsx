import { useAccount } from "@/common_lib/authentication/useAccount";
import { LoginService } from "@/common_lib/services/LoginService";

import { ServerService } from "@/common_lib/services/ServerService";
import { SessionService } from "@/common_lib/services/SessionService";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { Button } from "@/ui/shadcn/ui/button";
import { Separator } from "@/ui/shadcn/ui/separator";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { useAuth0 } from "@auth0/auth0-react";

import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { FormEvent, JSX, SVGProps, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
export default observer(function Login() {
  const { account, accountLoading } = useAccount();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [login] = useState(() =>
    observable({
      email: "",
      password: "",

      tryValidation: false,
      validationRules: {
        password: {
          required: {
            message: "Password is required",
          },
        },
        email: {
          required: {
            message: "Email is required",
          },
          email: {
            message: "Email is invalid",
          },
        },
      },
    }),
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setBusy(true);
    event.preventDefault();
    try {
      const result = await LoginService.loginEmailPassword(
        login.email,
        login.password,
      );
      if (SessionService.isAuthenticated) {
        nav("/manage/dashboard");
      } else {
        if (result.error) {
          setErrorMessage(result.error);
        }
        setBusy(false);
      }
    } catch (e) {
      console.error(e);
      setBusy(false);
    }
  };

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
    <div className="flex h-dvh flex-col items-center justify-start bg-[url('/img/hero.png')] bg-cover p-5">
      <div className="rounded-xl bg-white shadow-md sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mb-4 sm:mx-auto sm:w-full sm:max-w-md">
              <img className="mx-auto w-auto" src="/img/logo.png" alt="Logo" />
            </div>
            <h2 className="text-center text-xl font-semibold text-foreground">
              Log in or create account
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <FormFieldText
                  type="text"
                  record={login}
                  field="email"
                  label="Email"
                  name="email"
                  required={true}
                  autoComplete="email"
                  validateOn="blur"
                  className="mt-2"
                />
              </div>
              <div>
                <FormFieldText
                  record={login}
                  field="password"
                  label="Password"
                  validateOn="blur"
                  type={showPassword ? "text" : "password"}
                  append={
                    <div
                      data-nowrap={true}
                      className="relative -mr-px inline-flex cursor-pointer items-center border-l px-3 py-2 text-sm font-semibold text-gray-900"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={showPassword ? "u u-eye-off" : "u u-eye"} />
                    </div>
                  }
                />
              </div>
              {errorMessage ? (
                <div className="my-3 items-center rounded-md bg-error-100 px-6 py-2.5 text-center text-sm font-semibold text-gray-700">
                  {errorMessage}
                </div>
              ) : (
                ""
              )}
              <Button type="submit" className="mt-4 w-full py-2 font-medium">
                {busy ? "Logging in..." : "Sign in"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="flex w-full items-center justify-center space-x-2 py-2"
              onClick={loginWithGoogle}
            >
              <GoogleIcon className="size-5" aria-hidden={true} />
              <span className="text-sm font-medium">Sign in with Google</span>
            </Button>

            <Button
              variant="link"
              className="mt-4 flex w-full items-center justify-center space-x-2 py-2 text-primary underline"
              asChild={true}
            >
              <Link to="/signup" className="text-sm font-medium">
                Create an account
              </Link>
            </Button>

            <p className="dark:text-muted-foreground mt-4 text-xs text-muted-foreground">
              By signing in, you agree to our{" "}
              <a href="#" className="underline underline-offset-4">
                terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

const GoogleIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
);

/*
<div className="flex h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
          
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
    */
