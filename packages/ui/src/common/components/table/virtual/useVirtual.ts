import {
  UIEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type VirtualizationProps = {
  rows: number;
  rowHeight: number | ((index: number) => number) | number[];
  overscan?: number;
  height?: number;
  estimatedRowHeight?: number;
  enableDynamicHeight?: boolean;
  loadMore?: () => void;
  scrollDebounceMs?: number;
};

export const useVirtualization = (props: VirtualizationProps) => {
  const {
    rows,
    rowHeight,
    overscan = 4,
    height,
    estimatedRowHeight = 50,
    enableDynamicHeight = false,
    loadMore,
    scrollDebounceMs = 5,
  } = props;

  const scrollRef = useRef<HTMLDivElement>(null);

  // stable flags/refs
  const enableDynamicHeightRef = useRef(enableDynamicHeight);
  enableDynamicHeightRef.current = enableDynamicHeight;

  const rafRef = useRef<number>(0);
  const debounceRef = useRef<number>(0);
  const rowRefs = useRef<Map<number, HTMLElement>>(new Map());
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // measured heights (never delete once set; hysteresis on updates)
  const [measuredHeights, setMeasuredHeights] = useState<Map<number, number>>(
    new Map(),
  );

  // container height (don’t read getBoundingClientRect inside calcs)
  const [containerHeight, setContainerHeight] = useState<number>(height ?? 0);
  useLayoutEffect(() => {
    if (height != null) {
      setContainerHeight(height);
      return;
    }
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const h = Math.round(entries[0]?.contentRect.height || 0);
      setContainerHeight(h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  // debounced scrollTop (integer to avoid boundary thrash)
  const [debouncedScrollTop, setDebouncedScrollTop] = useState(0);
  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const current = Math.round((e.target as HTMLDivElement).scrollTop);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
          setDebouncedScrollTop(current);
        }, scrollDebounceMs);
        // loadMore without debounce
        if (
          loadMore &&
          scrollRef.current &&
          current + scrollRef.current.clientHeight >=
            (e.target as HTMLDivElement).scrollHeight - 500
        ) {
          loadMore();
        }
      });
    },
    [loadMore, scrollDebounceMs],
  );

  // helper: base estimated height
  const getEstimated = useCallback(
    (i: number): number => {
      if (typeof rowHeight === "number") return rowHeight;
      if (typeof rowHeight === "function")
        return rowHeight(i) ?? estimatedRowHeight;
      if (Array.isArray(rowHeight)) return rowHeight[i] ?? estimatedRowHeight;
      return estimatedRowHeight;
    },
    [rowHeight, estimatedRowHeight],
  );

  // effective row height (measured overrides estimate)
  const getRowHeight = useCallback(
    (i: number): number => {
      const m = measuredHeights.get(i);
      if (enableDynamicHeightRef.current && m != null) return m;
      return getEstimated(i);
    },
    [measuredHeights, getEstimated],
  );

  // cumulative heights
  const cumulativeHeights = useMemo(() => {
    const arr: number[] = [0];
    let total = 0;
    for (let i = 0; i < rows; i++) {
      total += getRowHeight(i);
      arr.push(total);
    }
    return arr;
  }, [rows, getRowHeight]);

  // binary searches with stable <= / <
  const findStartIndex = useCallback(
    (scrollTop: number) => {
      if (cumulativeHeights.length <= 1) return 0;
      let left = 0;
      let right = cumulativeHeights.length - 2; // last row index
      while (left < right) {
        const mid = (left + right + 1) >> 1;
        if ((cumulativeHeights[mid] ?? 0) <= scrollTop) left = mid;
        else right = mid - 1;
      }
      return Math.max(0, left - overscan);
    },
    [cumulativeHeights, overscan],
  );

  const findEndIndex = useCallback(
    (scrollTop: number, h: number) => {
      if (cumulativeHeights.length <= 1) return rows;
      const target = scrollTop + h;
      let left = 0;
      let right = cumulativeHeights.length - 2;
      while (left < right) {
        const mid = (left + right + 1) >> 1;
        const endOfMid = cumulativeHeights[mid + 1] ?? 0;
        if (endOfMid < target) left = mid;
        else right = mid - 1;
      }
      return Math.min(rows, left + 1 + overscan);
    },
    [cumulativeHeights, overscan, rows],
  );

  // calculations
  const calculations = useMemo(() => {
    const start = findStartIndex(debouncedScrollTop);
    const end = findEndIndex(debouncedScrollTop, containerHeight);
    const topPad = cumulativeHeights[start] || 0;
    const bottomPad =
      (cumulativeHeights[cumulativeHeights.length - 1] || 0) -
      (cumulativeHeights[end] || 0);
    return {
      start,
      end,
      topPad,
      bottomPad,
      totalHeight: cumulativeHeights[cumulativeHeights.length - 1] || 0,
    };
  }, [
    debouncedScrollTop,
    containerHeight,
    findStartIndex,
    findEndIndex,
    cumulativeHeights,
  ]);

  // viewport anchoring when heights above change
  const prevCumRef = useRef<number[]>([]);
  useLayoutEffect(() => {
    if (!scrollRef.current) {
      prevCumRef.current = cumulativeHeights;
      return;
    }
    const prev = prevCumRef.current;
    const curr = cumulativeHeights;
    if (prev.length && curr.length) {
      const anchor = findStartIndex(debouncedScrollTop + 0); // same rounding domain
      const delta = (curr[anchor] ?? 0) - (prev[anchor] ?? 0);
      if (delta !== 0) scrollRef.current.scrollTop += delta;
    }
    prevCumRef.current = curr;
  }, [cumulativeHeights, debouncedScrollTop, findStartIndex]);

  // row ref callback (observe once)
  const setRowRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      const prev = rowRefs.current.get(index);
      if (prev && resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(prev);
      }
      if (el) {
        el.dataset.virtualIndex = String(index);
        rowRefs.current.set(index, el);
        if (enableDynamicHeightRef.current && resizeObserverRef.current) {
          resizeObserverRef.current.observe(el);
        }
      } else {
        rowRefs.current.delete(index);
      }
    },
    [],
  );

  // optional: direct measure (consistent border-box), kept for API compat
  const measureRow = useCallback((index: number, el: HTMLElement) => {
    const h = Math.round(el.getBoundingClientRect().height);
    setMeasuredHeights((prev) => {
      const curr = prev.get(index);
      if (curr == null || Math.abs(curr - h) > 2) {
        const next = new Map(prev);
        next.set(index, h);
        return next;
      }
      return prev;
    });
  }, []);

  // ResizeObserver for dynamic heights (single source of truth)
  useEffect(() => {
    if (
      !enableDynamicHeightRef.current ||
      typeof ResizeObserver === "undefined"
    )
      return;

    const ro = new ResizeObserver((entries) => {
      const batch = new Map<number, number>();
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const idx = Number(el.dataset.virtualIndex ?? -1);
        if (idx < 0) continue;

        // Prefer border-box size; fallback to contentRect/boundingClient
        const anyEntry = entry as any;
        const box =
          (Array.isArray(anyEntry.borderBoxSize) &&
            anyEntry.borderBoxSize[0]?.blockSize) ??
          anyEntry.borderBoxSize?.blockSize ??
          entry.contentRect.height ??
          el.getBoundingClientRect().height;

        batch.set(idx, Math.round(box));
      }

      if (batch.size) {
        setMeasuredHeights((prev) => {
          let changed = false;
          const next = new Map(prev);
          batch.forEach((h, i) => {
            const curr = prev.get(i);
            if (curr == null || Math.abs(curr - h) > 2) {
              next.set(i, h);
              changed = true;
            }
          });
          return changed ? next : prev;
        });
      }
    });

    resizeObserverRef.current = ro;
    // start observing any rows already mounted
    rowRefs.current.forEach((el) => ro.observe(el));

    return () => {
      ro.disconnect();
      resizeObserverRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // visible indices
  const { start, end, topPad, bottomPad, totalHeight } = calculations;
  const visibleIndexes = useMemo(() => {
    const out: number[] = [];
    for (let i = start; i < end; i++) out.push(i);
    return out;
  }, [start, end]);

  const topSpacerStyle = useMemo<React.CSSProperties>(
    () => ({ height: topPad, padding: 0, border: 0 }),
    [topPad],
  );
  const bottomSpacerStyle = useMemo<React.CSSProperties>(
    () => ({ height: bottomPad, padding: 0, border: 0 }),
    [bottomPad],
  );

  return {
    scrollRef,
    visibleIndexes,
    startIndex: start,
    endIndex: end,
    topSpacerStyle,
    bottomSpacerStyle,
    topPad,
    bottomPad,
    totalHeight,
    onScroll,
    setRowRef,
    measureRow, // optional
  };
};
