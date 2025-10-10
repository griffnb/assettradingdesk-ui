import useMediaQuery, { BREAKPOINTS } from "@/common_lib/hooks/useMediaQuery";
import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/utils/cn";
import { Transition } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { ReactNode, useRef } from "react";

const styleVariants = cva(
  "fixed top-0 isolate z-panel flex h-full flex-col border-border-neutral-secondary bg-white shadow",
  {
    variants: {
      location: {
        right: "right-0 border-l",
        left: "left-0 border-r",
      },
    },
    defaultVariants: {
      location: "right",
    },
  }
);

const overlayVariants = cva("z-[99] fixed inset-0 backdrop-blur-md", {
  variants: {
    opacity: {
      transparent: "bg-gray-50 opacity-5",
      semiTransparent: "bg-gray-300 opacity-60",
    },
  },
  defaultVariants: {
    opacity: "semiTransparent",
  },
});

interface SidePanelWrapProps
  extends VariantProps<typeof styleVariants>,
    VariantProps<typeof overlayVariants> {
  title?: string | ReactNode;
  children: ReactNode;
  closeAction?: () => void;
  closeHandler?: () => void;
  className?: string;
  resizeable?: boolean;
  size: "sm" | "md" | "lg" | "custom";
  id: string;
  headerActions?: ReactNode;
  overlay?: boolean;
}
export const SidePanelWrap = observer((rawProps: SidePanelWrapProps) => {
  const {
    location = "right",
    className,
    overlay,
    opacity,
    ...props
  } = rawProps;
  const { isMediaQuery: isSmallDesktop } = useMediaQuery(BREAKPOINTS.LG);
  const elementRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef<boolean>(false);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!elementRef.current) return;
    const startX = e.clientX;

    // Get the current computed width from CSS
    const startWidth = elementRef.current.getBoundingClientRect().width;

    resizingRef.current = true;

    const onMouseMove = (event: MouseEvent) => {
      if (!resizingRef.current || !elementRef.current) return;
      const newWidth = startWidth + (startX - event.clientX);
      const clampedWidth = Math.max(100, newWidth); // Minimum width: 100px

      // Immediate DOM update for instant visual feedback
      elementRef.current.style.width = `${clampedWidth}px`;
    };

    const onMouseUp = () => {
      resizingRef.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("selectstart", preventSelection);
    };

    const preventSelection = (e: Event) => e.preventDefault();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("selectstart", preventSelection);
  };

  const getWidth = () => {
    switch (props.size) {
      case "sm":
        return "w-1/4";
      case "md":
        return "w-1/3";
      case "lg":
        return "w-1/2";
      default:
        return "";
    }
  };

  return (
    <>
      {overlay && (
        <div
          data-slot="panel-overlay"
          className={cn(overlayVariants({ opacity }))}
        ></div>
      )}
      <Transition
        enter="transition ease-out duration-200"
        enterFrom={`opacity-0 ${location == "right" ? "translate-x-5" : "-translate-x-5"}`}
        enterTo={"opacity-100 translate-x-0"}
        leave="transition ease-in duration-150"
        leaveFrom={"opacity-100 translate-x-0"}
        leaveTo={`opacity-0 ${location == "right" ? "translate-x-5" : "-translate-x-5"}`}
        show={true}
        appear={true}
      >
        <div
          ref={elementRef}
          className={cn(styleVariants({ location, className }), getWidth())}
          style={
            isSmallDesktop
              ? {
                  height:
                    "calc(100svh - var(--top-nav-height) - var(--bottom-nav-height))",
                  top: "var(--top-nav-height)",
                  width: "100%",
                }
              : {}
          }
        >
          {props.resizeable && (
            <div
              onMouseDown={handleMouseDown}
              className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-transparent"
            />
          )}

          <div className="flex flex-row items-center border-b border-border-neutral-primary p-6 pb-3">
            {typeof props.title === "string" ? (
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">{props.title}</h1>
              </div>
            ) : (
              props.title
            )}
            <div className="ml-auto flex items-center">
              {props.headerActions}
              <div className="ml-4 mr-5 cursor-pointer">
                <svg
                  onClick={close}
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
              </div>
            </div>
          </div>
          {props.children}
        </div>
      </Transition>
    </>
  );
});
