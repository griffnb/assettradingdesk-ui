import { useLayoutEffect, useRef } from "react";

export function useGridCount<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const countRef = useRef(1);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      const el = ref.current!;
      const kids = Array.from(el.children) as HTMLElement[];
      if (!kids.length) return (countRef.current = 1);

      const firstTop = Math.round(kids[0]?.getBoundingClientRect().top || 0);
      let n = 0;
      for (const k of kids) {
        if (Math.round(k.getBoundingClientRect().top) !== firstTop) break;
        n++;
      }
      if (n != countRef.current) {
        console.log(`updating count new ${n} old ${countRef.current}`);
        countRef.current = n;
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return { ref, count: countRef.current };
}
