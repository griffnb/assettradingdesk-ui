import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import { BusyButton } from "@/ui/common/components/buttons/BusyButton";
import { Button } from "@/ui/common/components/buttons/Button";
import { FormFieldCheckbox } from "@/ui/common/components/form/fields/FormFieldCheckbox";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { cn } from "@/utils/cn";
import { isObjectValid } from "@/utils/validations";
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { HTMLAttributes } from "react";

export interface InitialFormProps extends HTMLAttributes<HTMLDivElement> {
  onSubmit: () => void;
  authStore: AuthStore;
  errorMessage: string | null;
}
export const InitialForm = observer(function InitialForm(
  fullProps: InitialFormProps,
) {
  const { className, onSubmit, authStore, errorMessage } = fullProps;
  const { getAccessTokenWithPopup } = useAuth0();

  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          connection: "google-oauth2",
        },
      });
      if (token) {
        authStore.setMethod(AuthenticationType.OAUTH);
        authStore.setOAuthProvider("google");
        authStore.setToken(token);
        onSubmit();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const hasErrors = isObjectValid(authStore, true).length > 0;

  return (
    <div className={cn(className)}>
      <div className="my-2 text-xl font-semibold text-text-neutral-primary">
        Log in to Atlas
      </div>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={() => {
          return false;
        }}
      >
        <div className="flex flex-col gap-y-2">
          <FormFieldText
            type="text"
            record={authStore}
            field="identifier"
            label="Email or mobile number"
            name="identifier"
            required={true}
            autoComplete="email tel webauthn"
            validateOn="blur"
          />
          {errorMessage && (
            <div className="flex flex-row items-center gap-2 text-sm text-red-600">
              <i
                className={cn("u u-alert-circle flex-none", {
                  "mt-1 self-start": errorMessage.length > 200,
                })}
              ></i>{" "}
              {errorMessage}
            </div>
          )}
          <FormFieldCheckbox
            record={authStore}
            field="remember_me"
            label=""
            checkedValue={true}
            uncheckedValue={false}
            placeholder="Remember me on this device"
          />
        </div>

        <BusyButton
          type="submit"
          className="w-full"
          variant={"primary"}
          disabled={hasErrors}
          size={"xl"}
          action={onSubmit}
        >
          Continue
        </BusyButton>
        <div className="mt-6 flex flex-col gap-4">
          <div className="relative h-5 text-sm">
            <div className="absolute inset-0 top-1/2 h-px w-full shrink-0 bg-border-neutral-primary"></div>
            <span
              className="relative mx-auto block w-fit bg-white px-2 text-text-neutral-quinary-disabled"
              data-slot="field-separator-content"
            >
              OTHER OPTIONS
            </span>
          </div>
          <Button
            variant="tertiary"
            size="xl"
            className="w-full"
            onClick={loginWithGoogle}
          >
            <i className="u u-feed-google"></i>Log in with Google
          </Button>
          <Button
            variant="primary"
            size="xl"
            className="w-full bg-fg-success-secondary hover:bg-fg-success-primary"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Create an account
          </Button>
        </div>
      </form>
    </div>
  );
});
