import { SimpleModal } from "@/ui/common/components/modal/SimpleModal";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { BusyButton } from "../buttons/BusyButton";
import { Button, ButtonVariants } from "../buttons/Button";
import { ModalWrapProps } from "./ModalWrap";

export const ConfirmModalId = "ConfirmModal";

interface ConfirmModalProps extends Omit<ModalWrapProps, "id" | "children"> {
  title?: string;
  text: ReactNode;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  buttons?: ReactNode;
  confirmVariant?: ButtonVariants;
  forced?: boolean;
  id?: string;
}

/**
 * ## ConfirmModal slots
 * @slot {"confirm-title"} data-slot="confirm-title"
 * @slot {"confirm-text"} data-slot="confirm-text"
 * @slot {"confirm-buttons"} data-slot="confirm-buttons"
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

export const ConfirmModal = observer((rawProps: ConfirmModalProps) => {
  const {
    size,
    text,
    title,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    buttons,
    confirmVariant,
    forced,
    ...props
  } = rawProps;

  const closeHandler = forced ? () => {} : props.closeHandler;

  return (
    <SimpleModal
      {...props}
      size={size || "sm"}
      id={props.id || ConfirmModalId}
      closeHandler={closeHandler}
      hideClose={forced}
    >
      <div className="px-6 pb-6 pt-4" data-slot="confirm-wrapper">
        <div
          data-slot="confirm-title"
          className="text-center text-lg font-bold text-text-neutral-primary"
        >
          {title}
        </div>
        <div
          data-slot="confirm-text"
          className="py-4 text-center text-text-neutral-primary"
        >
          {text}
        </div>
        <div
          className="flex flex-row justify-between gap-2"
          data-slot="confirm-buttons"
        >
          {buttons ? (
            buttons
          ) : (
            <>
              {onCancel && (
                <Button
                  data-slot="cancel-button"
                  variant="tertiary"
                  className="w-full"
                  onClick={onCancel}
                >
                  {cancelText}
                </Button>
              )}
              <BusyButton
                data-slot="confirm-button"
                variant={confirmVariant || "primary"}
                className="w-full"
                action={onConfirm}
              >
                {confirmText}
              </BusyButton>
            </>
          )}
        </div>
      </div>
    </SimpleModal>
  );
});
