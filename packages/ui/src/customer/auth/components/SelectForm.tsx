import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { cn } from "@/common_lib/utils/cn";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { AuthSelectButton } from "./AuthSelectButton";

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

export interface InitialFormProps extends VariantProps<typeof styleVariants> {
  onSubmit: (method: AuthenticationType) => void;
  authStore: AuthStore;
  methods: AuthenticationType[];
  className?: string;
  title?: string;
  subtitle?: string;
}
export const SelectForm = observer(function SelectForm(
  fullProps: InitialFormProps,
) {
  const { className, variant, onSubmit, authStore, methods, title, subtitle } =
    fullProps;

  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={() => {
          return false;
        }}
      >
        {title && (
          <div className="mb-4 flex flex-col self-stretch text-text-neutral-primary">
            <div className="text-2xl leading-8">{title}</div>
            <div className="justify-start text-2xl font-bold leading-6">
              {authStore.formattedIdentifier}
            </div>
          </div>
        )}
        {subtitle && (
          <div className="text-Colors-Text-Neutrals-text-neutral-tertiary justify-start self-stretch font-['Titillium_Web'] text-base font-semibold leading-6">
            {subtitle}
          </div>
        )}

        {methods.map((method) => {
          switch (method) {
            case AuthenticationType.PASSWORD:
              return (
                <AuthSelectButton
                  key={method}
                  icon="u u-password"
                  label="Enter your password"
                  subLabel=""
                  onClick={() => {
                    authStore.setMethod(AuthenticationType.PASSWORD);
                    onSubmit(AuthenticationType.PASSWORD);
                  }}
                />
              );
            case AuthenticationType.EMAIL_OTP:
              return (
                <AuthSelectButton
                  key={method}
                  icon="u u-mail-02"
                  label="Email a code"
                  subLabel="Receive login code via email message."
                  onClick={() => {
                    authStore.setMethod(AuthenticationType.EMAIL_OTP);
                    onSubmit(AuthenticationType.EMAIL_OTP);
                  }}
                />
              );
            case AuthenticationType.SMS_OTP:
              return (
                <AuthSelectButton
                  key={method}
                  icon="u u-message-dots-square"
                  label="Text a code"
                  subLabel="Receive a login code. Skip the password"
                  onClick={() => {
                    authStore.setMethod(AuthenticationType.SMS_OTP);
                    onSubmit(AuthenticationType.SMS_OTP);
                  }}
                />
              );
            case AuthenticationType.PASSKEY:
              if (authStore.passkeyManager.detectSupport) {
                return (
                  <AuthSelectButton
                    key={method}
                    icon="u u-passkey-01"
                    label="Use a passkey"
                    subLabel="Face ID, Touch ID, PIN"
                    onClick={() => {
                      authStore.setMethod(AuthenticationType.PASSKEY);
                      onSubmit(AuthenticationType.PASSKEY);
                    }}
                  />
                );
              }
              return null;
            default:
              return null;
          }
        })}
      </form>
    </div>
  );
});
