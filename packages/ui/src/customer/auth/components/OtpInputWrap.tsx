import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { cn } from "@/common_lib/utils/cn";
import { Timer } from "@/ui/common/components/text/Timer";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { OtpInput } from "./OtpInput";

const styleVariants = cva("flex flex-col gap-3 self-stretch", {
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

export interface OtpInputWrapProps extends VariantProps<typeof styleVariants> {
  title: string;
  identifier?: string;
  authStore: AuthStore;
  resendCode: () => void;
  testCode?: string | null;
  setOTP: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}
export const OtpInputWrap = observer(function OtpInputWrap(
  fullProps: OtpInputWrapProps,
) {
  const {
    className,
    variant,
    title,
    identifier,
    authStore,
    resendCode,
    testCode,
    setOTP,
    icon,
  } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-start self-stretch">
          {icon}
          <div className="justify-start self-stretch text-2xl font-semibold leading-8 text-text-neutral-primary">
            {title}
          </div>
          <div className="justify-start self-stretch text-sm font-normal leading-5 text-text-neutral-tertiary">
            For your security, we need to ensure it’s really you.
          </div>
        </div>
        <div className="justify-start self-stretch">
          <span className="text-sm font-normal leading-5 text-text-neutral-tertiary">
            Enter the 6-digit code sent to
          </span>
          <span className="mx-1 text-sm font-bold leading-5 text-text-neutral-tertiary">
            {identifier || authStore.formattedIdentifier}.
          </span>
          <span className="text-sm font-normal leading-5 text-text-neutral-tertiary">
            It may take a moment to receive the code.
          </span>
        </div>
      </div>
      <OtpInput value={authStore.otp || ""} onChange={setOTP} />
      <div className="flex items-center gap-1 self-stretch">
        <span className="text-base font-normal leading-6 text-text-neutral-tertiary">
          Didn&apos;t get a code?
        </span>
        <span
          className="cursor-pointer text-base font-semibold leading-6 text-text-brand-primary underline"
          onClick={resendCode}
        >
          Resend code{" "}
          <Timer className="contents" expiresAt={authStore.expiresAt || 0} />
        </span>
      </div>
      {testCode && (
        <div className="text-sm font-normal leading-5 text-text-neutral-tertiary">
          <strong>Test Code:</strong> {testCode}
        </div>
      )}
    </div>
  );
});
