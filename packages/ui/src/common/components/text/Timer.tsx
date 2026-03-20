import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import {
  ComponentPropsWithoutRef,
  ElementType,
  JSX,
  useEffect,
  useState,
} from "react";
/**
 * Timer component that counts down from a Unix timestamp
 *
 * @example
 * <Timer expiresAt={1234567890} />
 * <Timer as="span" expiresAt={1234567890} />
 */

type TimerOwnProps<T extends ElementType = ElementType> = {
  as?: T;
  expiresAt: number;
};

export type TimerProps<T extends ElementType = "div"> = TimerOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TimerOwnProps>;

function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return "Expired";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

export const Timer = observer(function Timer<T extends ElementType = "div">(
  fullProps: TimerProps<T>,
) {
  const { as, className, expiresAt, ...props } = fullProps;
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const Component = as || "div";

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = dayjs().unix();
      const remaining = expiresAt - now;
      setTimeRemaining(remaining > 0 ? remaining : 0);
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <Component className={className} {...props}>
      {formatTimeRemaining(timeRemaining)}
    </Component>
  );
}) as <T extends ElementType = "div">(props: TimerProps<T>) => JSX.Element;
