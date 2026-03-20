import { cn } from "@/common_lib/utils/cn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/ui/shadcn/ui/input-otp";
import { cva, VariantProps } from "class-variance-authority";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { observer } from "mobx-react-lite";

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

export interface OtpInputProps extends VariantProps<typeof styleVariants> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}
export const OtpInput = observer(function OtpInput(fullProps: OtpInputProps) {
  const { className, variant, value, onChange } = fullProps;

  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <InputOTP
        pattern={REGEXP_ONLY_DIGITS}
        maxLength={6}
        value={value}
        onChange={(value) => onChange(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
});
