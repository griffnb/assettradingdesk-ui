import { useEffect, useState } from "react";

// These line up with tailwind default breakpoints
export const BREAKPOINTS = {
  XS: 375,
  SM: 640,
  MD: 768, // Default mobile breakpoint
  LG: 1024,
  XL: 1280,
  XXL: 1536,
};

// Helper function to detect if user is on a mobile or tablet device
export const isMobileDevice = () => {
  if (typeof navigator !== "undefined") {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  return false;
};

function useMediaQuery(breakpoint = BREAKPOINTS.MD) {
  const [isMediaQuery, setMediaQuery] = useState(false);
  const [ready, setReady] = useState(false);
  const [isMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const mediaQueryHit = window.innerWidth < breakpoint;

        setMediaQuery((prev) => {
          if (prev !== mediaQueryHit) {
            return mediaQueryHit;
          }
          return prev; // No update if the value is the same
        });
        setReady(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return { isMediaQuery, isMobile, ready };
}

export default useMediaQuery;
