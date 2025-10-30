import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/utils/cn";
import { Transition } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

const styleVariants = cva(`fixed right-0 isolate flex flex-col bg-white`, {
  variants: {
    variant: {
      default: "z-takeover",
    },
    size: {
      auto: [
        "h-[calc(100svh-var(--top-nav-height)-var(--bottom-nav-height))] top-[var(--top-nav-height)]",
        "lg:w-[calc(100vw-312px)] lg:h-[calc(100svh-var(--titlebar-height))] lg:top-[var(--titlebar-height)]",
        "data-[inapp=true]:w-full data-[inapp=true]:h-full data-[inapp=true]:top-0",
      ],
      full: "w-full h-full top-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "auto",
  },
});
/*
 style={
            isSmallDesktop && !isInApp
              ? {
                  height:
                    "calc(100svh - var(--top-nav-height) - var(--bottom-nav-height))",
                  top: "var(--top-nav-height)",
                  width: "100%",
                }
              : size !== "full"
                ? {
                    top: "var(--titlebar-height)",
                    height: "calc(100svh - var(--titlebar-height))",
                  }
                : {}
          }
                */
interface TakeoverPanelWrapProps extends VariantProps<typeof styleVariants> {
  title?: string | ReactNode;
  children: ReactNode;
  closeAction?: () => void;
  closeHandler?: () => void;
  className?: string;
  id: string;
  hideBack?: boolean;
}
export const TakeoverPanelWrap = observer(
  (rawProps: TakeoverPanelWrapProps) => {
    const { variant, size, className, ...props } = rawProps;

    const close = () => {
      if (props.closeHandler) {
        props.closeHandler();
        return;
      }
      LayerService.remove(props.id);
      if (props.closeAction) {
        props.closeAction();
      }
    };

    return (
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-x-5"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-5"
        show={true}
        appear={true}
      >
        <div className={cn(styleVariants({ variant, size, className }))}>
          {!props.hideBack && (
            <div className="flex flex-row items-center border-b border-border-neutral-primary bg-white p-6 py-3">
              <div
                className="mr-5 flex cursor-pointer flex-row items-center gap-2 border-r border-border-neutral-primary pr-3 font-semibold"
                onClick={close}
              >
                <i className="fa fa-arrow-left" />
                Back
              </div>
              {typeof props.title === "string" ? (
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">{props.title}</h1>
                </div>
              ) : (
                props.title
              )}
            </div>
          )}
          {props.children}
        </div>
      </Transition>
    );
  },
);
