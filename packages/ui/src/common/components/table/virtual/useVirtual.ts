import {
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type VirtualizationProps = {
  rows: number;
  rowHeight: number | ((index: number) => number) | number[]; // Dynamic or fixed row height
  overscan?: number; // extra rows above/below
  height?: number;
  // Optional key extractor for stable row keys
  estimatedRowHeight?: number; // Default height for unmeasured rows
  enableDynamicHeight?: boolean; // Enable dynamic height measurement
  loadMore?: () => void; // Function to load more data when scrolling
  scrollDebounceMs?: number; // Debounce delay for scroll calculations (default: 5ms)
};

/**
 * A virtualization hook that provides efficient rendering for large lists.
 *
 * Performance optimized to return indexes instead of actual row data, reducing memory overhead.
 * Includes scroll debouncing to handle fast scrolling scenarios efficiently.
 *
 * @example
 * ```tsx
 * const { visibleIndexes, startIndex, endIndex, scrollRef, onScroll } = useVirtualization({
 *   rows: data.length,
 *   rowHeight: 50,
 *   overscan: 5,
 *   scrollDebounceMs: 16 // Optional: debounce scroll calculations (default: 16ms)
 * });
 *
 * return (
 *   <div ref={scrollRef} onScroll={onScroll}>
 *     {visibleIndexes.map(index => (
 *       <Row key={index} data={data[index]} />
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @returns Object containing:
 * - visibleIndexes: Array of row indexes that should be rendered
 * - startIndex/endIndex: Range bounds for simple iteration
 * - scrollRef: Ref for the scrollable container
 * - onScroll: Scroll event handler with debounced calculations
 * - setRowRef: Callback for measuring dynamic row heights
 * - topSpacerStyle/bottomSpacerStyle: Styles for spacer elements
 */
export const useVirtualization = (props: VirtualizationProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [debouncedScrollTop, setDebouncedScrollTop] = useState(0);
  const rafRef = useRef<number>(null);
  const scrollDebounceRef = useRef<NodeJS.Timeout>(null);

  // Get debounce delay from props with a sensible default
  const scrollDebounceMs = props.scrollDebounceMs ?? 5; // Default to 5ms

  // Store measured heights for dynamic sizing
  const [measuredHeights, setMeasuredHeights] = useState<Map<number, number>>(
    new Map(),
  );
  const rowRefs = useRef<Map<number, HTMLElement>>(new Map());
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Store enableDynamicHeight in a ref to avoid recreating setRowRef
  const enableDynamicHeightRef = useRef(props.enableDynamicHeight);
  enableDynamicHeightRef.current = props.enableDynamicHeight;

  // Add a flag to defer height measurements during initial mount
  const isInitialMountRef = useRef(true);

  // Function to measure and update row height
  const measureRow = useCallback(
    (index: number, element: HTMLElement) => {
      if (!enableDynamicHeightRef.current) return;

      // Use requestAnimationFrame to ensure measurement happens after layout
      requestAnimationFrame(() => {
        const height = element.getBoundingClientRect().height;

        setMeasuredHeights((prev) => {
          const currentHeight = prev.get(index);
          // Only update if height has changed significantly to prevent micro-adjustments
          // Use a larger threshold to prevent jitter
          if (!currentHeight || Math.abs(currentHeight - height) > 2) {
            const newMap = new Map(prev);
            newMap.set(index, Math.round(height)); // Round to prevent sub-pixel issues
            return newMap;
          }
          return prev; // Return the same map if no changes
        });
      });
    },
    [], // No dependencies
  );

  // Ref callback for row elements
  const setRowRef = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      const currentElement = rowRefs.current.get(index);

      if (element) {
        element.dataset.virtualIndex = index.toString();
        rowRefs.current.set(index, element);

        // ONLY observe with ResizeObserver, don't double-measure with measureRow
        // This prevents the double-render issue when rows are first mounted
        if (enableDynamicHeightRef.current && resizeObserverRef.current) {
          resizeObserverRef.current.observe(element);
        }
      } else {
        // Clean up when element is removed
        if (currentElement && resizeObserverRef.current) {
          resizeObserverRef.current.unobserve(currentElement);
        }
        rowRefs.current.delete(index);
      }
    },
    [], // Add the actual dependency instead of empty array
  );

  // Create a stable reference for significant measured heights only
  const significantMeasuredHeights = useMemo(() => {
    if (!enableDynamicHeightRef.current) {
      return new Map<number, number>(); // Return empty map when dynamic height is disabled
    }

    const filtered = new Map<number, number>();

    measuredHeights.forEach((measuredHeight, index) => {
      // Get estimated height for comparison
      let estimatedHeight: number;
      if (typeof props.rowHeight === "number") {
        estimatedHeight = props.rowHeight;
      } else if (typeof props.rowHeight === "function") {
        estimatedHeight = props.rowHeight(index)
          ? props.rowHeight(index)
          : props.estimatedRowHeight || 50;
      } else if (Array.isArray(props.rowHeight)) {
        estimatedHeight =
          props.rowHeight[index] || props.estimatedRowHeight || 50;
      } else {
        estimatedHeight = props.estimatedRowHeight || 50;
      }

      const difference = Math.abs(measuredHeight - estimatedHeight);
      const threshold = Math.max(15, estimatedHeight * 0.25); // More lenient threshold: 25% or 15px

      // Only keep measurements that are significantly different
      if (difference > threshold) {
        filtered.set(index, measuredHeight);
      }
    });

    return filtered;
  }, [
    measuredHeights,
    props.rowHeight,
    props.estimatedRowHeight,
    enableDynamicHeightRef.current,
  ]); // Remove props.rows dependency to stabilize

  // Helper function to get row height
  const getRowHeight = useCallback(
    (index: number): number => {
      // Get the base estimated height first
      let estimatedHeight: number;
      if (typeof props.rowHeight === "number") {
        estimatedHeight = props.rowHeight;
      } else if (typeof props.rowHeight === "function") {
        estimatedHeight = props.rowHeight(index)
          ? props.rowHeight(index)
          : props.estimatedRowHeight || 50;
      } else if (Array.isArray(props.rowHeight)) {
        estimatedHeight =
          props.rowHeight[index] || props.estimatedRowHeight || 50;
      } else {
        estimatedHeight = props.estimatedRowHeight || 50;
      }

      // Use significant measured height if available, but only if dynamic height is enabled
      if (
        enableDynamicHeightRef.current &&
        significantMeasuredHeights.has(index)
      ) {
        return significantMeasuredHeights.get(index)!;
      }

      return estimatedHeight;
    },
    [
      props.rowHeight,
      props.estimatedRowHeight,
      enableDynamicHeightRef.current,
      significantMeasuredHeights,
    ], // Remove props.rows dependency to stabilize
  );

  // Calculate cumulative heights for positioning
  const cumulativeHeights = useMemo(() => {
    const heights: number[] = [0]; // Start with 0 for easy indexing
    let total = 0;

    for (let i = 0; i < props.rows; i++) {
      total += getRowHeight(i);
      heights.push(total);
    }

    return heights;
  }, [props.rows, getRowHeight]); // This will now be more stable since getRowHeight uses significantMeasuredHeights

  // Binary search to find the first visible row
  const findStartIndex = useCallback(
    (scrollTop: number): number => {
      if (cumulativeHeights.length <= 1) return 0;

      let left = 0;
      let right = cumulativeHeights.length - 2; // -2 because last item is total height

      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const midHeight = cumulativeHeights[mid];
        if (midHeight !== undefined && midHeight < scrollTop) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      return Math.max(0, left - (props.overscan || 0));
    },
    [cumulativeHeights, props.overscan],
  );

  // Find the last visible row
  const findEndIndex = useCallback(
    (scrollTop: number, containerHeight: number): number => {
      if (cumulativeHeights.length <= 1) return props.rows;

      const targetScroll = scrollTop + containerHeight;
      let left = 0;
      let right = cumulativeHeights.length - 2; // -2 because last item is total height

      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const midHeight = cumulativeHeights[mid + 1]; // Look at the end of this row
        if (midHeight !== undefined && midHeight <= targetScroll) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      return Math.min(props.rows, left + 1 + (props.overscan || 0));
    },
    [cumulativeHeights, props.overscan, props.rows],
  );

  // Memoize all calculations to prevent unnecessary recalculations
  const calculations = useMemo(() => {
    const height = props.height
      ? props.height
      : scrollRef.current?.getBoundingClientRect().height || 0;

    const start = findStartIndex(debouncedScrollTop);
    const end = findEndIndex(debouncedScrollTop, height);

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
    findStartIndex,
    findEndIndex,
    cumulativeHeights,
    props.height,
    scrollRef.current?.getBoundingClientRect().height,
  ]);

  const { start, end, topPad, bottomPad } = calculations;

  // Memoize visible indexes array - much more memory efficient than slicing actual rows
  const visibleIndexes = useMemo(() => {
    const indexes: number[] = [];
    for (let i = start; i < end; i++) {
      indexes.push(i);
    }
    return indexes;
  }, [start, end]);

  // Optimize scroll handling with requestAnimationFrame and debouncing
  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const currentScrollTop = (e.target as HTMLDivElement).scrollTop;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        // Clear previous debounce timer
        if (scrollDebounceRef.current) {
          clearTimeout(scrollDebounceRef.current);
        }

        // Debounce the expensive virtualization calculations
        scrollDebounceRef.current = setTimeout(() => {
          setDebouncedScrollTop(currentScrollTop);
        }, scrollDebounceMs);

        // Trigger load more immediately (don't debounce this for responsiveness)

        if (
          props.loadMore &&
          scrollRef.current &&
          currentScrollTop + scrollRef.current.clientHeight >=
            (e.target as HTMLDivElement).scrollHeight - 500 // 300px from bottom
        ) {
          props.loadMore();
        }
      });
    },
    [props.loadMore, scrollDebounceMs],
  );

  // Clean up RAF on unmount and setup ResizeObserver for dynamic heights
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout | null = null;
    const batchedUpdates = new Map<number, number>();

    if (
      enableDynamicHeightRef.current &&
      typeof ResizeObserver !== "undefined"
    ) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        // Batch all height updates to prevent multiple state updates
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const index = parseInt(element.dataset.virtualIndex || "-1", 10);

          if (index >= 0) {
            const height = Math.round(entry.contentRect.height);
            batchedUpdates.set(index, height);
          }
        });

        // Debounce the batch processing to prevent multiple rapid updates
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
          // Defer processing until after initial mount to reduce re-renders
          if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            // Delay initial measurements to let all rows mount first
            setTimeout(() => {
              processBatchedUpdates();
            }, 100);
          } else {
            processBatchedUpdates();
          }
        }, 50); // Increased debounce time to batch more measurements together

        function processBatchedUpdates() {
          if (batchedUpdates.size > 0) {
            setMeasuredHeights((prev) => {
              const newMap = new Map(prev);
              let hasSignificantChanges = false;

              batchedUpdates.forEach((measuredHeight, index) => {
                const currentHeight = prev.get(index);

                // Get the estimated height for this row to compare
                let estimatedHeight: number;
                if (typeof props.rowHeight === "number") {
                  estimatedHeight = props.rowHeight;
                } else if (typeof props.rowHeight === "function") {
                  estimatedHeight = props.rowHeight(index)
                    ? props.rowHeight(index)
                    : props.estimatedRowHeight || 50;
                } else if (Array.isArray(props.rowHeight)) {
                  estimatedHeight =
                    props.rowHeight[index] || props.estimatedRowHeight || 50;
                } else {
                  estimatedHeight = props.estimatedRowHeight || 50;
                }

                // Only store the measured height if it's significantly different from estimate
                const difference = Math.abs(measuredHeight - estimatedHeight);
                const threshold = Math.max(15, estimatedHeight * 0.25); // More lenient threshold

                if (difference > threshold) {
                  // Only update if this measured height is different from what we had before
                  if (
                    !currentHeight ||
                    Math.abs(currentHeight - measuredHeight) > 5
                  ) {
                    newMap.set(index, measuredHeight);
                    hasSignificantChanges = true;
                  }
                }
                // If measured height is close to estimate, remove any stored measurement
                else if (currentHeight) {
                  newMap.delete(index);
                  hasSignificantChanges = true;
                }
              });

              // Clear the batch after processing
              batchedUpdates.clear();

              return hasSignificantChanges ? newMap : prev;
            });
          }
        }
      });

      // Observe all current row elements
      rowRefs.current.forEach((element) => {
        resizeObserverRef.current?.observe(element);
      });
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, []); // Remove dynamicHeightEnabled dependency to prevent re-renders

  // Memoize spacer styles to prevent object recreation
  const topSpacerStyle = useMemo(
    () => ({
      height: topPad,
      padding: 0,
      border: 0,
    }),
    [topPad],
  );

  const bottomSpacerStyle = useMemo(
    () => ({
      height: bottomPad,
      padding: 0,
      border: 0,
    }),
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
    onScroll,
    // New dynamic height functionality
    setRowRef,
    measureRow,
    getRowHeight,
    totalHeight: calculations.totalHeight,
  };
};
