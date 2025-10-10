import { useEffect, useRef } from "react";

type StopPollingFn = () => void;

export function usePolling(
  callback: (stop: StopPollingFn) => void,
  waitTime: number,
  maxAttempts: number,
  active: boolean,
) {
  const attemptsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    attemptsRef.current = 0;
    intervalRef.current = setInterval(() => {
      attemptsRef.current += 1;
      if (attemptsRef.current > maxAttempts) {
        stop();
        return;
      }
      callback(stop);
    }, waitTime);

    return () => {
      stop();
    };
  }, [waitTime, maxAttempts, active]);
}
