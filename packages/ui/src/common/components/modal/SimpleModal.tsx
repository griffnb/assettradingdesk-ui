import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { ModalWrap, ModalWrapProps } from "./ModalWrap";

const styleVariants = cva(
  "max-h-[calc(100svh-var(--customer-top-nav-h))] relative w-full rounded-lg shadow transition-all lg:my-auto mt-auto overscroll-none",
  {
    variants: {
      variant: {
        default: "border bg-white text-left",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface SimpleModalProps
  extends ModalWrapProps,
    VariantProps<typeof styleVariants> {
  title?: ReactNode;
  closeHandler?: () => void;
  children: ReactNode;
  className?: string;
  hideClose?: boolean;
}

/**
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

export const SimpleModal = observer((rawProps: SimpleModalProps) => {
  const { className, variant, ...props } = rawProps;

  const closeHandler = () => {
    if (props.closeHandler) {
      props.closeHandler();
    } else {
      LayerService.remove(props.id);
    }
  };

  return (
    <ModalWrap {...props}>
      <div
        className={cn(styleVariants({ variant, className }))}
        data-slot="simple-modal-content"
      >
        {props.title}

        {!props.hideClose && (
          <button
            type="button"
            className="absolute right-6 top-4"
            onClick={closeHandler}
            data-slot="simple-modal-close-button"
          >
            <span className="sr-only">Close</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="x-circle-solid">
                <path
                  id="Vector"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 12C1 5.92 5.92 1 12 1C18.08 1 23 5.92 23 12C23 18.08 18.08 23 12 23C5.92 23 1 18.08 1 12ZM8.29 8.29C8.68 7.9 9.31 7.9 9.7 8.29L11.99 10.58L14.28 8.29C14.67 7.9 15.3 7.9 15.69 8.29C16.08 8.68 16.08 9.31 15.69 9.7L13.4 11.99L15.69 14.28C16.08 14.67 16.08 15.3 15.69 15.69C15.3 16.08 14.67 16.08 14.28 15.69L11.99 13.4L9.7 15.69C9.31 16.08 8.68 16.08 8.29 15.69C7.9 15.3 7.9 14.67 8.29 14.28L10.58 11.99L8.29 9.7C7.9 9.31 7.9 8.68 8.29 8.29Z"
                  fill="#A4A7AE"
                />
              </g>
            </svg>
          </button>
        )}

        {props.children}
      </div>
    </ModalWrap>
  );
});
