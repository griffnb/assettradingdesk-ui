import { isMobileDevice } from "@/common_lib/hooks/useMediaQuery";
import { NotificationService } from "@/common_lib/services/NotificationService";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { InitialForm } from "../components/InitialForm";
import { OTPForm } from "../components/OTPForm";
import { PasswordForm } from "../components/PasswordForm";
import { SelectForm } from "../components/SelectForm";

interface LoginPageProps {
  onLoginSuccess?: () => void;
}
export const LoginPage = observer(function LoginPage(props: LoginPageProps) {
  const router = useRouter();
  const [step, setStep] = useState<"initial" | "select" | "otp" | "password">(
    "initial",
  );
  const [authStore] = useState(() => new AuthStore());
  const [testCode, setTestCode] = useState<string | null>(null);
  const [methods, setMethods] = useState<AuthenticationType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMobile] = useState(isMobileDevice());

  // Sync step with URL query parameter
  useEffect(() => {
    if (router.isReady) {
      const urlStep = router.query.step as string;
      const method = router.query.method as string;
      const token = router.query.token as string;

      if (parseInt(method) == AuthenticationType.OAUTH) {
        authStore.setMethod(AuthenticationType.OAUTH);
        if (token) {
          authStore.setToken(token);
        }
        handleSubmit("initial");
        return;
      }

      switch (urlStep) {
        case "initial":
          setStep("initial");
          return;
        case "select":
          if (authStore.identifier == null || authStore.identifier === "") {
            setStep("initial");
            return;
          }
          setStep("select");
          return;
        case "otp":
          if (authStore.identifier == null || authStore.identifier === "") {
            setStep("initial");
            return;
          }
          if (authStore.selectedMethod == null) {
            setStep("select");
            return;
          }
          setStep("otp");
          return;
        case "password":
          if (authStore.identifier == null || authStore.identifier === "") {
            setStep("initial");
            return;
          }
          if (authStore.selectedMethod == null) {
            setStep("select");
            return;
          }
          setStep("password");
          return;

        default:
          setStep("initial");
          return;
      }
    }
  }, [router.query.step, router.isReady]);

  // Update URL when step changes
  const updateStep = (newStep: "initial" | "select" | "otp" | "password") => {
    setStep(newStep);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, step: newStep },
      },
      undefined,
      { shallow: true },
    );
  };

  const loadMethods = async () => {
    const resp = await authStore.getMethods();
    if (resp.success && resp.data) {
      setMethods(resp.data.methods || []);
      return resp.data;
    } else {
      NotificationService.addError(resp.error);
    }
    return { methods: [], not_setup: false };
  };

  const resendCode = async () => {
    const resp = await authStore.initiateAuthentication();
    if (resp.success && resp.data) {
      if (resp.data.test_code) {
        setTestCode(resp.data.test_code);
      }
    } else {
      if (resp.error !== "Internal Error") {
        NotificationService.addError(resp.error);
      } else {
        NotificationService.addError(
          "Failed to resend code. Please try again.",
        );
      }
    }
  };

  const handleSubmit = async (
    inlineStep?: "initial" | "select" | "otp" | "password",
  ) => {
    const submitStep = inlineStep || step;

    switch (submitStep) {
      case "initial": {
        if (authStore.selectedMethod == AuthenticationType.OAUTH) {
          const resp = await authStore.initiateAuthentication();
          if (resp.success && resp.data) {
            if (resp.data.verified) {
              props.onLoginSuccess?.();
              return;
            }

            if (resp.data?.required_2fa) {
              if (resp.data.test_code) {
                setTestCode(resp.data.test_code);
              }
              updateStep("otp");
              return;
            }

            if (resp.data.signup) {
              router.push(
                {
                  pathname: "/signup",
                  query: { token: authStore.token },
                },
                undefined,
                { shallow: true },
              );
              return;
            }
          } else {
            if (resp.error !== "Internal Error") {
              NotificationService.addError(resp.error);
            } else {
              NotificationService.addError(
                "This account doesn't exist. Please check your email and try again, or reach out to support if you need assistance.",
              );
            }
          }
          return;
        }

        const resp = await loadMethods();
        if (resp.methods.length === 0) {
          if (resp.not_setup) {
            setErrorMessage(
              `You can't use this phone number to log in until you have verified it. 
              Please log in with your email address instead. Once you've logged in, you will be prompted to verify any unverified phone numbers. 
              If you have questions, please reach out to support@atlas.net.`,
            );
          } else {
            if (authStore.identifier?.includes("@")) {
              setErrorMessage("Sorry, we don't recognize this email.");
            } else {
              setErrorMessage("Sorry, we don't recognize this phone number.");
            }
          }
          return;
        }

        // Auto-select if mobile and only one method available
        if (isMobile && resp.methods.length === 1) {
          authStore.setMethod(resp.methods[0]!);
          handleSubmit("select");
          return;
        }

        updateStep("select");
        break;
      }
      case "select": {
        if (authStore.selectedMethod == AuthenticationType.PASSWORD) {
          updateStep("password");
          return;
        }

        const resp = await authStore.initiateAuthentication();
        if (resp.success && resp.data) {
          if (resp.data.verified) {
            //SessionService.setSessionToken(resp.data.session_token);
            props.onLoginSuccess?.();
            return;
          }

          if (resp.data.test_code) {
            setTestCode(resp.data.test_code);
          }
          updateStep("otp");
          return;
        } else {
          if (resp.error !== "Internal Error") {
            NotificationService.addError(resp.error);
          } else {
            NotificationService.addError(
              "Authentication failed. Please try again, or reach out to support if you need assistance.",
            );
          }
        }
        return;
      }
      case "password": {
        const resp = await authStore.initiateAuthentication();
        if (resp.success && resp.data) {
          if (resp.data.verified) {
            props.onLoginSuccess?.();
            return;
          }
          if (resp.data.required_2fa) {
            if (resp.data.test_code) {
              setTestCode(resp.data.test_code);
            }
            updateStep("otp");
            return;
          }
        } else {
          if (resp.error !== "Internal Error") {
            NotificationService.addError(resp.error);
          } else {
            NotificationService.addError(
              "Authentication failed. Please try again, or reach out to support if you need assistance.",
            );
          }
        }

        return;
      }
      case "otp": {
        // Final submission logic here
        const resp = await authStore.verifyAuthentication();
        if (resp.success && resp.data && resp.data.verified) {
          props.onLoginSuccess?.();
          return;
        } else {
          if (resp.error !== "Internal Error") {
            NotificationService.addError(resp.error);
          } else {
            NotificationService.addError(
              "Authentication failed. Please try again, or reach out to support if you need assistance.",
            );
          }
        }
        return;
      }
    }
  };

  const handleBack = () => {
    switch (step) {
      case "select":
        updateStep("initial");
        return;
      case "password":
        // If mobile with single method, select was skipped, go to initial
        if (isMobile && methods.length === 1) {
          updateStep("initial");
        } else {
          updateStep("select");
        }
        return;
      case "otp":
        // If mobile with single method, select was skipped, go to initial
        if (isMobile && methods.length === 1) {
          updateStep("initial");
        } else {
          updateStep("select");
        }
        return;
      default:
        return;
    }
  };

  const handleForgotPassword = async () => {
    // Find the Email OTP method
    const otpMethod = methods.find((m) => m === AuthenticationType.EMAIL_OTP);

    if (!otpMethod) {
      NotificationService.addError(
        "No OTP method available. Please contact support.",
      );
      return;
    }

    // Set the OTP method
    authStore.setMethod(otpMethod);

    // Initiate authentication to send the code
    const resp = await authStore.initiateAuthentication();
    if (resp.success && resp.data) {
      if (resp.data.test_code) {
        setTestCode(resp.data.test_code);
      }
      updateStep("otp");
      return;
    } else {
      if (resp.error !== "Internal Error") {
        NotificationService.addError(resp.error);
      } else {
        NotificationService.addError(
          "Failed to send login code. Please try again.",
        );
      }
    }
  };

  return (
    <>
      {step !== "initial" && (
        <div className="flex flex-row items-center justify-between self-stretch border-b border-border-neutral-primary px-6 py-2 lg:py-4">
          <div
            className="flex flex-row items-center gap-1.5"
            onClick={handleBack}
            style={{ cursor: "pointer" }}
          >
            <i className="u u-arrow-left !size-5" />
            <div className="justify-start text-base font-semibold leading-6 text-text-neutral-secondary">
              Back
            </div>
          </div>
        </div>
      )}
      <div
        className={cn("mx-auto flex w-full max-w-lg flex-col gap-5 p-6", {
          "lg:pt-24": step === "initial",
        })}
      >
        <div className="flex flex-row items-center gap-x-5 sm:w-full sm:max-w-md">
          <img className="h-[60px]" src="/img/logo_privacy.svg" alt="Atlas" />
        </div>

        {(() => {
          switch (step) {
            case "initial":
              return (
                <InitialForm
                  authStore={authStore}
                  onSubmit={handleSubmit}
                  errorMessage={errorMessage}
                />
              );
            case "select":
              return (
                <SelectForm
                  authStore={authStore}
                  title="Login as"
                  subtitle="Select your preferred login method"
                  onSubmit={() => handleSubmit()}
                  methods={methods}
                />
              );
            case "password":
              return (
                <PasswordForm
                  authStore={authStore}
                  onSubmit={handleSubmit}
                  onForgotPassword={handleForgotPassword}
                />
              );
            case "otp":
              return (
                <OTPForm
                  authStore={authStore}
                  onSubmit={handleSubmit}
                  resendCode={resendCode}
                  testCode={testCode}
                />
              );
            default:
              return <div></div>;
          }
        })()}
      </div>
    </>
  );
});
