import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { Timer } from "@/ui/common/components/text/Timer";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";
import { OtpInput } from "./OtpInput";

const styleVariants = cva("", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface OTPFormProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  onSubmit: () => void;
  authStore: AuthStore;
  resendCode: () => void;
  testCode?: string | null;
}
export const OTPForm = observer(function OTPForm(fullProps: OTPFormProps) {
  const { className, variant, onSubmit, authStore, testCode, resendCode } =
    fullProps;

  const setOTP = (value: string) => {
    authStore.setOTP(value);
    if (value.length === 6) {
      onSubmit();
    }
  };

  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div className="flex flex-col items-start justify-start gap-6">
          <div className="flex flex-col items-start justify-center self-stretch">
            <div className="justify-start self-stretch text-2xl font-normal leading-8 text-text-neutral-primary">
              We sent a 6-digit login code to
            </div>
            <div className="justify-start self-stretch text-3xl font-bold leading-9 text-text-neutral-primary">
              {authStore.formattedIdentifier}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 self-stretch">
            <div className="justify-start self-stretch text-base font-normal leading-6 text-text-neutral-tertiary">
              Enter the code to securely log in to your account. It should
              arrive shortly.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <OtpInput value={authStore.otp || ""} onChange={setOTP} />
          <div className="inline-flex items-center justify-center gap-1 self-stretch">
            <div className="justify-start text-base font-normal leading-6 text-text-neutral-tertiary">
              Didn&apos;t get a code?
            </div>
            <span
              className="cursor-pointer text-base font-semibold leading-6 text-text-brand-primary underline"
              onClick={resendCode}
            >
              Resend code{" "}
              <Timer
                className="contents"
                expiresAt={authStore.expiresAt || 0}
              />
            </span>
          </div>
          {testCode && (
            <div className="text-sm font-normal leading-5 text-text-neutral-tertiary">
              <strong>Test Code:</strong> {testCode}
            </div>
          )}
        </div>
      </form>
    </div>
  );
});
