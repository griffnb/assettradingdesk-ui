"use client";

import { NotificationService } from "@/common_lib/services/NotificationService";
import { ServerService } from "@/common_lib/services/ServerService";
import { SessionService } from "@/common_lib/services/SessionService";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { getPublicEnvVar } from "@/utils/env";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const VerifyEmailSent = observer(function VerifyEmailSent() {
  const [isResending, setIsResending] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const verificationToken = location.state?.verificationToken;
  const email = location.state?.email;
  const isDevMode = getPublicEnvVar("PUBLIC_ENVIRONMENT") === "local";

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const resp = await ServerService.postRaw("/account/verify/resend", {});
      if (resp.success) {
        NotificationService.addSuccess("Verification email sent successfully");
      } else {
        NotificationService.addError(
          resp.error || "Failed to resend verification email",
        );
      }
    } catch {
      NotificationService.addError("Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  const handleUpdateEmail = () => {
    SessionService.clearSessionToken();
    SessionService.clearUser();
    nav("/signup");
  };

  const handleDevVerify = () => {
    if (verificationToken && email) {
      nav(
        `/signup/verify?verify=${verificationToken}&email=${encodeURIComponent(email)}`,
      );
    }
  };

  console.log("Verification Token:", verificationToken);
  console.log("Email:", email);

  return (
    <Card className="w-2/5 shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-center border-b pb-3">
          <img src="/img/logo.png" alt="Logo" />
        </CardTitle>
        <CardDescription className="flex justify-center text-xl font-semibold text-text-neutral-primary">
          Verify Your Email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-success-50">
            <i className="u u-mail text-4xl text-icon-success-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-neutral-primary">
              Check Your Inbox
            </h3>
            <p className="text-sm text-text-neutral-secondary">
              We&apos;ve sent a verification email to your address. Please check
              your inbox and click the verification link to continue.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {isDevMode && verificationToken && (
          <Button
            onClick={handleDevVerify}
            className="w-full"
            variant="secondary"
          >
            <i className="u u-wrench mr-2" />
            Dev: Verify Email Now
          </Button>
        )}
        <Button
          onClick={handleResendEmail}
          className="w-full"
          disabled={isResending}
          variant="default"
        >
          {isResending ? "Sending..." : "Resend Verification Email"}
        </Button>
        <Button
          onClick={handleUpdateEmail}
          className="w-full"
          variant="outline"
        >
          Update Email Address
        </Button>
      </CardFooter>
    </Card>
  );
});
