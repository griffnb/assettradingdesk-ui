import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/common_lib/utils/cn";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import { Badge } from "@/ui/common/components/badge/Badge";
import { SimpleModal } from "@/ui/common/components/modal/SimpleModal";
import { observer } from "mobx-react-lite";
import { OtpInputWrap } from "./OtpInputWrap";

export const OtpModalId = "OtpModal";

interface OtpModalProps {
  authStore: AuthStore;
  title: string;
  identifier?: string;
  testCode?: string | null;

  resendCode: () => void;
  onCodeEntered: (code: string) => void;
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

export const OtpModal = observer(function OtpModal(props: OtpModalProps) {
  const { authStore, title, identifier, resendCode, onCodeEntered } = props;

  const setOTP = (value: string) => {
    authStore.setOTP(value);
    if (value.length === 6) {
      onCodeEntered(value);
    }
  };
  let icon: string;
  switch (authStore.selectedMethod) {
    case AuthenticationType.EMAIL_OTP:
    case AuthenticationType.TWO_FA_EMAIL:
      icon = "u u-mail-02";
      break;
    case AuthenticationType.SMS_OTP:
    case AuthenticationType.TWO_FA_PHONE:
      icon = "u u-phone-03";
      break;
    case AuthenticationType.TWO_FA_KEY:
      icon = "u u-passkey-outline";
      break;
    default:
      icon = "u u-shield-lock";
  }

  const closeModal = () => {
    LayerService.remove(OtpModalId);
  };

  return (
    <SimpleModal
      id={OtpModalId}
      className="p-6 pt-4"
      size="sm"
      closeHandler={() => {}}
      hideClose={true}
    >
      <button
        type="button"
        className="absolute right-6 top-4"
        onClick={closeModal}
        data-slot="simple-modal-close-button"
      >
        <i className="u u-x-circle-solid !size-7 text-icon-neutral-quaternary" />
      </button>
      <div className="flex flex-col gap-5">
        <Badge
          size="custom"
          variant={"iconGradient"}
          color={"brand"}
          className="size-12 lg:self-start"
        >
          <i className={cn("!size-6", icon)} />
        </Badge>
        <OtpInputWrap
          authStore={authStore}
          resendCode={resendCode}
          testCode={props.testCode}
          setOTP={setOTP}
          title={title}
          identifier={identifier}
        />
      </div>
    </SimpleModal>
  );
});
