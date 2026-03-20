import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { LayerService } from "@/common_lib/services/LayerService";
import { NotificationService } from "@/common_lib/services/NotificationService";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import { AuthenticationMethodModel } from "@/models/models/authentication_method/model/AuthenticationMethodModel";
import { AuthService } from "@/models/services/AuthService";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { SimpleModal } from "@/ui/common/components/modal/SimpleModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AuthSelectButton } from "./AuthSelectButton";
import { OtpModal, OtpModalId } from "./OtpModal";

interface TwoFAModalProps {
  onComplete: () => void;
}

/**
 * ## OtpModal slots
 *
 *
 *
 * ## SimpleModal slots
 * @slot {"simple-modal-content"} data-slot="simple-modal-content"
 * @slot {"simple-modal-close-button"} data-slot="simple-modal-close-button"
 *
 * ## ModalWrap slots
 * @slot {"modal-wrapper"} data-slot="modal-wrapper"
 * @slot {"modal-overlay"} data-slot="modal-overlay"
 * @slot {"modal-content"} data-slot="modal-content"
 **/

export const TwoFAModal = observer(function TwoFAModal(props: TwoFAModalProps) {
  const [authStore] = useState(() => new AuthStore());
  const [methods, setMethods] = useState<AuthenticationMethodModel[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [methodId, setMethodId] = useState<string | null>(null);
  const [testCode, setTestCode] = useState<string | null>(null);

  useEffect(() => {
    AuthService.getAuth2FaMethods().then((resp) => {
      if (resp.success && resp.data) {
        setMethods(Store.authentication_method.loadMany(resp.data));
      } else {
        NotificationService.addError(
          resp.error || "Failed to load 2FA methods. Please try again.",
        );
      }
      setLoaded(true);
    });
  }, []);

  const initiate = async (methodId: string) => {
    setMethodId(methodId);
    const resp = await authStore.initiateTwoFA(methodId);
    if (!resp.success) {
      NotificationService.addError(
        resp.error || "Failed to initiate two factor authentication",
      );
      return;
    }
    if (authStore.selectedMethod === AuthenticationType.PASSKEY) {
      LayerService.remove(OtpModalId);
      props.onComplete();
      return;
    }

    if (resp.data?.test_code) {
      setTestCode(resp.data.test_code);
    }
  };

  const onCodeEntered = async () => {
    const verifyResp = await authStore.verifyTwoFA();
    if (verifyResp.success) {
      props.onComplete();
      return;
    }
    NotificationService.addError(verifyResp.error || "Failed to verify code");
  };

  if (
    authStore.selectedMethod &&
    authStore.selectedMethod != AuthenticationType.PASSKEY
  ) {
    // standard OTP modal
    return (
      <OtpModal
        title={"Enter Code"}
        onCodeEntered={onCodeEntered}
        resendCode={() => initiate(methodId as string)}
        authStore={authStore}
        identifier={authStore.formattedIdentifier}
        testCode={testCode}
      />
    );
  }

  return (
    <SimpleModal
      id={OtpModalId}
      className="p-6 pt-4"
      size="sm"
      closeHandler={() => {}}
      hideClose={true}
    >
      {!loaded ? (
        <LoadingSkeleton />
      ) : (
        <>
          <button
            type="button"
            className="absolute right-6 top-4"
            onClick={() => LayerService.remove(OtpModalId)}
            data-slot="simple-modal-close-button"
          >
            <i className="u u-x-circle-solid !size-7 text-icon-neutral-quaternary" />
          </button>
          <div className="flex flex-col gap-5">
            <div className="inline-flex flex-col items-start justify-center gap-3 self-stretch">
              <div className="flex flex-col items-start justify-start self-stretch">
                <div className="justify-start self-stretch text-2xl font-semibold leading-8 text-text-neutral-primary">
                  Verify it&apos;s you
                </div>
                <div className="justify-start self-stretch text-sm font-normal leading-5 text-text-neutral-tertiary">
                  For your security, we need to ensure it’s really you. Select
                  an authentication method.
                </div>
              </div>
            </div>
            {methods.map((method) => {
              switch (method.type) {
                case AuthenticationType.PASSWORD:
                  return (
                    <AuthSelectButton
                      key={method.id}
                      icon="u u-password"
                      label="Enter your password"
                      subLabel=""
                      onClick={() => {
                        authStore.setMethod(AuthenticationType.PASSWORD);
                        initiate(method.id as string);
                      }}
                    />
                  );
                case AuthenticationType.EMAIL_OTP:
                  return (
                    <AuthSelectButton
                      key={method.id}
                      icon="u u-mail-02"
                      label="Email a code"
                      subLabel={method.target || undefined}
                      onClick={() => {
                        authStore.setMethod(AuthenticationType.EMAIL_OTP);
                        initiate(method.id as string);
                      }}
                    />
                  );
                case AuthenticationType.SMS_OTP:
                  return (
                    <AuthSelectButton
                      key={method.id}
                      icon="u u-message-dots-square"
                      label="Text a code"
                      subLabel={method.formatedPhone || undefined}
                      onClick={() => {
                        authStore.setMethod(AuthenticationType.SMS_OTP);
                        initiate(method.id as string);
                      }}
                    />
                  );
                case AuthenticationType.TWO_FA_PHONE:
                  return (
                    <AuthSelectButton
                      key={method.id}
                      icon="u u-message-dots-square"
                      label="Text a code"
                      subLabel={method.formatedPhone || undefined}
                      onClick={() => {
                        authStore.setMethod(AuthenticationType.TWO_FA_PHONE);
                        initiate(method.id as string);
                      }}
                    />
                  );
                case AuthenticationType.PASSKEY:
                  if (authStore.passkeyManager.detectSupport) {
                    return (
                      <AuthSelectButton
                        key={method.id}
                        icon="u u-passkey-01"
                        label="Use a passkey"
                        subLabel="Face ID, Touch ID, PIN"
                        onClick={() => {
                          authStore.setMethod(AuthenticationType.PASSKEY);
                          initiate(method.id as string);
                        }}
                      />
                    );
                  }
                  return null;
                default:
                  return null;
              }
            })}
          </div>
        </>
      )}
    </SimpleModal>
  );
});
