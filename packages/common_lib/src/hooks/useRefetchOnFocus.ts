import { useEffect, useRef } from "react";

export function useRefetchOnFocus(
  refetch: () => void,
  delayMs: number = 10_000,
) {
  const lastBlur = useRef<number | null>(null);

  useEffect(() => {
    const handleBlur = () => {
      lastBlur.current = Date.now();
    };

    const handleFocus = () => {
      if (lastBlur.current && Date.now() - lastBlur.current > delayMs) {
        console.log("Refetching data...");
        refetch();
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch, delayMs]);
}
