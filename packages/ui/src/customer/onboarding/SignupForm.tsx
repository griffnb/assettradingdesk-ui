"use client";

import { NotificationService } from "@/common_lib/services/NotificationService";
import { ServerService } from "@/common_lib/services/ServerService";
import { SessionService } from "@/common_lib/services/SessionService";
import { Signup } from "@/models/models/account/model/Signup";
import { AccountService } from "@/models/models/account/services/AccountService";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { getOptionalPublicEnvVar, getPublicEnvVar } from "@/utils/env";
import { randomString } from "@/utils/strings";
import { isObjectValid } from "@/utils/validations";
import { useAuth0 } from "@auth0/auth0-react";
import { action, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AlertBar } from "../alerts/AlertBar";
import { Turnstile } from "../cloudflare/Turnstile";
import { SetPasswordFields } from "../password/SetPasswordFields";

export const SignupForm = observer(function SignupForm() {
  const [signupRecord] = useState<Signup>(new Signup());
  const [error, setError] = useState<string | null>(null);
  const [emailExists, setEmailExists] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { getAccessTokenWithPopup } = useAuth0();
  const nav = useNavigate();

  const setToken = (token: string) => {
    runInAction(() => {
      if (signupRecord) signupRecord.cf_token = token;
    });
  };

  const handleSubmit = action(async () => {
    if (!signupRecord) {
      return;
    }
    const errs = isObjectValid(signupRecord);
    if (errs && errs.length > 0) {
      return;
    }

    if (!isPasswordValid) {
      NotificationService.addError("Password does not meet requirements");
      return;
    }

    const existingResp = await checkExisting();
    if (existingResp && existingResp.data && existingResp.data.exists) {
      setEmailExists(true);
      return;
    }
    setEmailExists(false);

    const resp = await AccountService.signup(signupRecord);

    if (resp.success) {
      if (resp.data.token) {
        SessionService.setSessionToken(resp.data.token);
        await SessionService.reloadAccount();
        nav("/signup/verify/sent", {
          state: {
            verificationToken: resp.data.verification_token,
            email: signupRecord.email,
          },
        });
        return;
      }
    } else {
      setError(resp.error);
    }
  });

  const checkExisting = () => {
    return AccountService.checkExisting({
      email: signupRecord.email,
      cf_token: signupRecord.cf_token,
    });
  };

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
          if (response.data.is_signup) {
            nav("/signup/organization");
          } else {
            SessionService.setSessionToken(response.data.token);
            nav("/home");
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!signupRecord) {
    return <LoadingSkeleton />;
  }

  const turnstileKey = getOptionalPublicEnvVar("PUBLIC_TURNSTILE_KEY");
  const showTestData = getPublicEnvVar("PUBLIC_ENVIRONMENT") == "local";
  const disabled = isObjectValid(signupRecord, true).length > 0;

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
        {emailExists && (
          <AlertBar
            title="Email Already Exists"
            layout="row"
            color={"error"}
            className="mb-3 gap-0 [&_*[data-slot='alert-bar-title']]:font-semibold"
            icon={
              <i className="u u-alert-circle text-5xl text-icon-error-secondary" />
            }
            description={
              <div className="flex flex-col items-center gap-1 lg:flex-row">
                <span>You may already have an account. </span>
                <Link
                  to="/password/send"
                  className="text-text-error-primary underline"
                >
                  Forgot Password?
                </Link>
              </div>
            }
          />
        )}

        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => loginWithGoogle()}
        >
          Signup with Google <i className="fa-brands fa-google"></i>
        </Button>

        <div className="relative flex items-center justify-center self-stretch py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative bg-background px-4">
            <span className="text-sm font-medium text-muted-foreground">
              OR
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormFieldText
            record={signupRecord}
            field="first_name"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            className="space-y-2"
            required={true}
          />
          <FormFieldText
            record={signupRecord}
            field="last_name"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            className="space-y-2"
            required={true}
          />
        </div>
        <FormFieldText
          record={signupRecord}
          field="email"
          type="email"
          label="Email"
          placeholder="Enter your email address"
          className="space-y-2"
          required={true}
        />

        <SetPasswordFields
          record={signupRecord}
          syncIsPasswordValid={(b) => setIsPasswordValid(b)}
        />

        {turnstileKey && (
          <div className="flex w-full items-center justify-center">
            <Turnstile siteKey={turnstileKey} onVerify={setToken} />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {showTestData && (
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={() => {
              runInAction(() => {
                signupRecord.email = `test${randomString(10)}@assettradingdesk.com`;
                signupRecord.first_name = `Test${randomString(10)}`;
                signupRecord.last_name = `User${randomString(10)}`;
                signupRecord.phone = "+11234567890";
                signupRecord.password = "Test@1234";
                signupRecord.password_confirmation = "Test@1234";
              });
            }}
          >
            Test Data
          </Button>
        )}
        <Button onClick={handleSubmit} className="w-full" disabled={disabled}>
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
});
