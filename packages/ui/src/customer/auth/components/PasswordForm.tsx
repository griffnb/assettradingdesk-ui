import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { cn } from "@/common_lib/utils/cn";
import { BusyButton } from "@/ui/common/components/buttons/BusyButton";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useState } from "react";

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

export interface PasswordFormProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  onSubmit: () => Promise<void>;
  authStore: AuthStore;
  onForgotPassword: () => Promise<void>;
}
export const PasswordForm = observer(function PasswordForm(
  fullProps: PasswordFormProps,
) {
  const { className, variant, onSubmit, authStore, onForgotPassword } =
    fullProps;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div className="mb-4 flex flex-col self-stretch text-text-neutral-primary">
          <div className="text-2xl leading-8">Login as</div>
          <div className="justify-start text-2xl font-bold leading-6">
            {authStore.formattedIdentifier}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <FormFieldText
            record={authStore}
            field="password"
            label="Password"
            validateOn="blur"
            type={showPassword ? "text" : "password"}
            append={
              <div
                data-nowrap={true}
                className="relative -mr-px inline-flex cursor-pointer items-center border-l px-3 py-2 text-sm font-semibold text-text-neutral-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "u u-eye-off" : "u u-eye"} />
              </div>
            }
          />
          <BusyButton
            type="submit"
            variant={"primary"}
            size={"xl"}
            action={onSubmit}
          >
            Continue
          </BusyButton>
        </div>
        <div className="inline-flex gap-1 self-stretch">
          <div className="justify-start text-base font-normal leading-6 text-text-neutral-tertiary">
            Forgot password?
          </div>
          <span
            className="cursor-pointer text-base font-semibold leading-6 text-text-brand-primary"
            onClick={() => onForgotPassword()}
          >
            Email me a login code
          </span>
        </div>
      </form>
    </div>
  );
});
