import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const tooltipStyles = cva(
  "rounded-md p-2 text-sm text-white before:bg-inherit",
  {
    variants: {
      variant: {
        default: "bg-bg-neutral-overlay text-white text-xs font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TooltipProps extends VariantProps<typeof tooltipStyles> {
  tooltip: string | ReactNode;
  children: ReactElement;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  event?: "hover" | "click";
}

interface Position {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export const Tooltip = observer((props: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<Position>({});
  const childRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Function to call on click event
    const handleClickOutside = (event: MouseEvent) => {
      if (
        childRef.current &&
        tooltipRef.current &&
        !childRef.current.contains(event.target as Node) &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const arrowBase =
    "before:absolute before:rotate-45 before:w-4 before:h-4 before:z-[-1] before:bg-inherit ";

  const arrowLeft =
    "before:bottom-0 before:-left-1 before:top-0 before:my-auto before:mx-auto";

  const arrowDown =
    "before:-bottom-1 before:left-0  before:right-0 before:mx-auto";

  const arrowUp = "before:-top-1 before:left-0  before:right-0 before:mx-auto";
  const arrowRight =
    "before:bottom-0 before:top-0 before:my-auto before:-right-1 before:mx-auto";

  let arrow = "";
  switch (props.position) {
    case "top":
      arrow = arrowBase + arrowDown;
      break;
    case "bottom":
      arrow = arrowBase + arrowUp;
      break;
    case "left":
      arrow = arrowBase + arrowRight;
      break;
    case "right":
      arrow = arrowBase + arrowLeft;
      break;
    default:
      arrow = arrowBase + arrowDown;
      break;
  }

  useEffect(() => {
    if (childRef.current && tooltipRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      switch (props.position) {
        case "top":
          setTooltipPosition({
            top: rect.top - tooltipRect.height - 10, // Adjust as needed
            left: rect.left + rect.width / 2 - tooltipRect.width / 2,
          });
          break;
        case "bottom":
          setTooltipPosition({
            top: rect.bottom + 10, // Adjust as needed
            left: rect.left + rect.width / 2 - tooltipRect.width / 2,
          });
          break;
        case "left":
          setTooltipPosition({
            top: rect.top + rect.height / 2 - tooltipRect.height / 2,
            left: rect.left - tooltipRect.width - 10, // Adjust as needed
          });
          break;
        case "right":
          setTooltipPosition({
            top: rect.top + rect.height / 2 - tooltipRect.height / 2,
            left: rect.right + 10, // Adjust as needed
          });
          break;
        default:
          setTooltipPosition({
            top: rect.top - tooltipRect.height - 10, // Adjust as needed
            left: rect.left + rect.width / 2 - tooltipRect.width / 2,
          });
          break;
      }
    }
  }, [visible]);

  const hideTooltip = () => {
    setVisible(false);
  };
  const showTooltip = () => {
    setVisible(true);
  };

  let options: any = {};

  switch (props.event) {
    case "hover":
      options = {
        ref: childRef,
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
      };
      break;
    case "click":
      options = {
        ref: childRef,
        onClick: showTooltip,
      };
      break;
    default:
      options = {
        ref: childRef,
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
      };
      break;
  }

  let targetElement: ReactElement;
  // If the child is disabled, we need to wrap it to capture events
  // @ts-expect-error - ignore
  if (props.children.props?.disabled) {
    // Wrap the disabled child to capture events
    const spanHandlers =
      props.event === "click"
        ? { ref: childRef, onClick: showTooltip }
        : {
            ref: childRef,
            onMouseEnter: showTooltip,
            onMouseLeave: hideTooltip,
          };

    targetElement = (
      <span style={{ display: "inline-flex" }} {...spanHandlers}>
        {props.children}
      </span>
    );
  } else {
    targetElement = cloneElement(props.children, options);
  }

  const classes = cn(
    tooltipStyles({ variant: props.variant }),
    props.className
  );

  return (
    <>
      {targetElement}
      {visible && (
        <div
          ref={tooltipRef}
          className={cn(`fixed z-50 block`, arrow, classes)}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            bottom: tooltipPosition.bottom,
            right: tooltipPosition.right,
          }}
        >
          {props.tooltip}
        </div>
      )}
    </>
  );
});
