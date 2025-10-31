import { BusyButton } from "@/ui/common/components/buttons/BusyButton";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { FormEvent, ReactNode } from "react";

const wrapVariants = cva(
  "flex self-stretch flex-col items-center justify-center",
  {
    variants: {
      variant: {
        default: "my-3 w-full p-7 gap-y-4",
        custom: "",
      },
      width: {
        standard: "max-w-2xl mx-auto",
        full: "",
      },
    },
    defaultVariants: {
      variant: "default",
      width: "full",
    },
  },
);

const buttonBoxVariants = cva("flex flex-row items-center w-full", {
  variants: {
    buttonBox: {
      default: "mt-6 justify-end gap-x-4",
      custom: "",
    },
  },
  defaultVariants: {
    buttonBox: "default",
  },
});

export type FormWrapProps =
  | CancelFormProps
  | NonCancelFormProps
  | HideButtonFormProps;
interface BaseProps
  extends VariantProps<typeof wrapVariants>,
    VariantProps<typeof buttonBoxVariants> {
  children: ReactNode;
  saveAction: () => void;
  saveLabel?: string;
  showCancel?: boolean;
  extraButtons?: ReactNode;
  className?: string;
  hideButtons?: boolean;
  saveDisabled?: boolean;
  customButtons?: ReactNode;
  buttonWidth?: string;
}

interface HideButtonFormProps extends BaseProps {
  hideButtons: true;
  saveLabel?: undefined;
  showCancel?: undefined;
  extraButtons?: undefined;
}

interface NonCancelFormProps extends BaseProps {
  showCancel: false | undefined;
}

interface CancelFormProps extends BaseProps {
  showCancel: true;
  cancelLabel: string;
  cancelAction: () => void;
}

export type FormWrapVariantProps = VariantProps<typeof wrapVariants> &
  VariantProps<typeof buttonBoxVariants>;

// Define the component with correct generic syntax
export const FormWrap = observer(function FormWrap(rawProps: FormWrapProps) {
  const { variant, buttonBox, className, ...props } = rawProps;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;

    // Check if the event target is a textarea, or if it has some other specific attribute
    if (target.tagName === "TEXTAREA" || target.getAttribute("block-enter")) {
      return; // Ignore Enter key presses in textareas
    }
    if (event.key === "Enter" && event.shiftKey === false) {
      // Prevent default form submit behavior
      event.preventDefault();

      // Call the onSubmit prop function or any action
      props.saveAction();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // This prevents the form from submitting
    // Your form handling logic here
  };

  return (
    <form
      className={cn(wrapVariants({ variant, className }))}
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
    >
      {props.children}

      {!props.hideButtons && !props.customButtons && (
        <div className={cn(buttonBoxVariants({ buttonBox }))}>
          {props.extraButtons}
          {props.showCancel && (
            <BusyButton
              action={props.cancelAction}
              variant={"tertiary"}
              className={cn(props.buttonWidth)}
            >
              {props.cancelLabel}
            </BusyButton>
          )}
          <BusyButton
            disabled={props.saveDisabled}
            action={props.saveAction}
            variant={"primary"}
            className={cn(props.buttonWidth)}
          >
            {props.saveLabel}
          </BusyButton>
        </div>
      )}
      {props.customButtons}
    </form>
  );
});
