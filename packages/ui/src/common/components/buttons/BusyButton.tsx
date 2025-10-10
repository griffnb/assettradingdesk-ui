import { useState } from "react";
import { Button, ButtonProps } from "./Button";

interface BusyButtonProps extends ButtonProps {
  action: () => void;
}

// Define the component with correct generic syntax
export const BusyButton = (rawProps: BusyButtonProps) => {
  const [busy, setBusy] = useState(false);
  const { action, ...props } = rawProps;

  const clickHandler = async () => {
    if (busy) return;
    setBusy(true);
    await action();

    setBusy(false);
  };

  return (
    <Button
      {...props}
      appendIcon={
        busy ? (
          <i className="fa fa-spinner fa-spin flex-none"></i>
        ) : (
          props.appendIcon
        )
      }
      disabled={props.disabled || busy}
      onClick={clickHandler}
    >
      {props.children}
    </Button>
  );
};
