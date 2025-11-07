import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/ui/shadcn/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn([
        /* Layout & Display */
        "flex items-center gap-2",
        /* Disabled State */
        "has-disabled:opacity-50",
        containerClassName,
      ])}
      className={cn(["disabled:cursor-not-allowed", className])}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(["flex items-center", className])}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn([
        /* Layout & Sizing */
        "relative flex h-9 w-9 items-center justify-center",
        /* Typography */
        "text-sm",
        /* Borders & Shadows */
        "border-neutral-200 border-y border-r shadow-xs",
        /* Border Radius */
        "first:rounded-l-md first:border-l last:rounded-r-md",
        /* Transitions */
        "transition-all outline-none",
        /* Active State */
        "data-[active=true]:z-10 data-[active=true]:border-neutral-950 data-[active=true]:ring-[3px] data-[active=true]:ring-neutral-950/50",
        /* Active Invalid State */
        "data-[active=true]:aria-invalid:ring-red-500/20 data-[active=true]:aria-invalid:border-red-500",
        /* Invalid State */
        "aria-invalid:border-red-500",
        /* Dark Mode Base */
        "dark:bg-neutral-200/30 dark:border-neutral-800 dark:dark:bg-neutral-800/30",
        /* Dark Mode Active */
        "dark:data-[active=true]:border-neutral-300 dark:data-[active=true]:ring-neutral-300/50",
        /* Dark Mode Active Invalid */
        "dark:data-[active=true]:aria-invalid:ring-red-900/20 dark:dark:data-[active=true]:aria-invalid:ring-red-900/40 dark:data-[active=true]:aria-invalid:border-red-900",
        /* Dark Mode Invalid */
        "dark:aria-invalid:border-red-900",
        className,
      ])}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={cn(["pointer-events-none absolute inset-0 flex items-center justify-center"])}>
          <div className={cn([
            /* Layout & Sizing */
            "h-4 w-px",
            /* Colors */
            "bg-neutral-950",
            /* Animation */
            "animate-caret-blink duration-1000",
            /* Dark Mode */
            "dark:bg-neutral-50",
          ])} />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
