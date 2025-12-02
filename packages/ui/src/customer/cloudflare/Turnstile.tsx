import { useEffectOnce } from "@/common_lib/hooks/useEffectOnce";
import { FC, useRef } from "react";

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
}

declare global {
  interface Window {
    turnstile?: any;
  }
}

export const Turnstile: FC<TurnstileProps> = ({ siteKey, onVerify }) => {
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  useEffectOnce(() => {
    // Ensure we're on the client-side before accessing `window`
    if (typeof window === "undefined" || window.turnstile) return;

    const loadTurnstileScript = () => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = () => {
        if (turnstileRef.current) {
          window.turnstile.render(turnstileRef.current, {
            sitekey: siteKey,
            callback: onVerify,
            size: "flexible",
          });
        }
      };
      document.body.appendChild(script);
    };

    loadTurnstileScript();

    return () => {
      // Cleanup by resetting Turnstile on unmount
      if (turnstileRef.current && window.turnstile) {
        window.turnstile.reset(turnstileRef.current);
      }
    };
  });

  return <div ref={turnstileRef} className="w-full [&>div]:w-full" />;
};
