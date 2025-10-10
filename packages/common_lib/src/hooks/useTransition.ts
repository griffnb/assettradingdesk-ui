import { RefObject, useEffect } from "react";

interface UseTransitionProps {
  ref: RefObject<HTMLElement>;
  initialClasses: string[]; // Array of Tailwind classes for initial state
  transitionClasses: string[]; // Array of Tailwind classes for transition
  delay?: number; // optional delay before applying the transition classes
  onAnimateEnd?: () => void; // optional callback when the transition ends
}
/*
Example:

  const transitionConfig = useMemo(
    () => ({
      ref: elementRef,
      initialClasses: ["opacity-0", "-translate-y-5"], // Hidden and shifted down
      transitionClasses: [
        "opacity-100",
        "translate-y-0",
        "transition-all",
        "duration-200",
        "ease-in-out",
      ], // Fade in and slide up with smooth transition
    }),
    [elementRef, ready],
  );

  useTransition(transitionConfig);

  Will remove the transition classes after the transition ends
  */

export const useTransition = ({
  ref,
  initialClasses,
  transitionClasses,
  delay = 1,
  onAnimateEnd,
}: UseTransitionProps): void => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTransitionEnd = () => {
      transitionClasses.forEach((cls) => element.classList.remove(cls));
      if (onAnimateEnd) onAnimateEnd();
    };
    // Add event listener for transition end
    element.addEventListener("transitionend", handleTransitionEnd);
    // Add initial Tailwind classes
    initialClasses.forEach((cls) => element.classList.add(cls));

    // Transition to the new classes after a delay
    const timeout = setTimeout(() => {
      initialClasses.forEach((cls) => element.classList.remove(cls));
      transitionClasses.forEach((cls) => element.classList.add(cls));
    }, delay);
    return () => {
      clearTimeout(timeout);
      element.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [ref, initialClasses, transitionClasses, delay]);
};
