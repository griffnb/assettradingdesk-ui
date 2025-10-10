import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

const modalVariants = {
  wrapper: cva("fixed flex top-0 left-0 z-modal size-full overflow-y-auto"),
  overlay: cva("fixed inset-0 backdrop-blur-md", {
    variants: {
      opacity: {
        transparent: "bg-gray-50 opacity-5",
        semiTransparent: "bg-gray-300 opacity-60",
      },
    },
    defaultVariants: {
      opacity: "semiTransparent",
    },
  }),
  content: cva("mx-auto flex flex-row w-full", {
    variants: {
      size: {
        full: "lg:w-full",
        sm: "lg:w-[450px]",
        md: "lg:w-[600px]",
        lg: "lg:w-[800px]",
        xl: "lg:w-3/4",
        fit: "lg:w-fit",
        custom: "",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }),
};

export interface ModalWrapProps
  extends VariantProps<typeof modalVariants.overlay>,
    VariantProps<typeof modalVariants.content> {
  id: string;
  closeHandler?: () => void;
  children: ReactNode;
  contentClassName?: string;
}

/**
 *
 * ## ModalWrap slots
 * @slot {"modal-wrapper"} data-slot="modal-wrapper"
 * @slot {"modal-overlay"} data-slot="modal-overlay"
 * @slot {"modal-content"} data-slot="modal-content"
 **/

export const ModalWrap = observer((props: ModalWrapProps) => {
  const closeHandler = () => {
    if (props.closeHandler) {
      props.closeHandler();
    } else {
      LayerService.remove(props.id);
    }
  };

  return (
    <div className={cn(modalVariants.wrapper())} data-slot="modal-wrapper">
      {/* Background overlay */}
      <div
        data-slot="modal-overlay"
        className={cn(modalVariants.overlay({ opacity: props.opacity }))}
        onClick={closeHandler}
      ></div>
      {/* Modal content */}
      <div
        className={cn(
          modalVariants.content({ size: props.size }),
          props.contentClassName
        )}
        data-slot="modal-content"
      >
        {props.children}
      </div>
    </div>
  );
});
