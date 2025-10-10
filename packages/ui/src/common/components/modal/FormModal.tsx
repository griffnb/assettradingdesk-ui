import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { Button } from "../buttons/Button";
import { ModalWrap, ModalWrapProps } from "./ModalWrap";

interface FormModalProps extends ModalWrapProps {
  title: ReactNode;
  titleIcon?: string;
  saveHandler?: () => void;
  saveLabel?: string;
  saveIcon?: string;
  showSave?: boolean;
  cancelLabel?: string;
  showCancel?: boolean;
  children: ReactNode;
  className?: string;
}
export const FormModal = observer((props: FormModalProps) => {
  const saveHandler = () => {
    if (props.saveHandler) {
      props.saveHandler();
    } else {
      LayerService.remove(props.id);
    }
  };

  const closeHandler = () => {
    if (props.closeHandler) {
      props.closeHandler();
    } else {
      LayerService.remove(props.id);
    }
  };

  return (
    <ModalWrap {...props}>
      <div className="flex w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          className={cn(
            "relative rounded-lg border bg-white pt-4 text-left shadow transition-all sm:my-24 sm:w-full",
            props.className
          )}
        >
          <div className="flex gap-x-2.5 px-4">
            <h3 className="flex items-center gap-x-3 truncate text-xl font-bold text-gray-900">
              {props.titleIcon && (
                <div className="flex size-12 items-center justify-center rounded-lg border border-gray-200">
                  <i className={props.titleIcon}> </i>
                </div>
              )}
              {props.title}
            </h3>
            <button type="button" className="ml-auto" onClick={closeHandler}>
              <span className="sr-only">Close</span>
              <svg
                className="size-6 text-gray-700"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {props.children}

          {(props.showSave || props.showCancel) && (
            <div className="block gap-x-3 p-6 sm:flex sm:flex-row-reverse">
              {props.showSave && (
                <Button variant="primary" onClick={saveHandler}>
                  {props.saveLabel}
                  {props.saveIcon && <i className={props.saveIcon}></i>}
                </Button>
              )}
              {props.showCancel && (
                <Button variant="tertiary" onClick={closeHandler}>
                  {props.cancelLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </ModalWrap>
  );
});
