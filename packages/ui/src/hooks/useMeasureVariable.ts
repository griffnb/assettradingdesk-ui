import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { VariableService } from "./VariableService";

type DimensionType = "height" | "width";

/**
 * Hook to measure the height or width of a component and store it as a CSS variable
 * @param variableName - The name of the CSS variable (without the -- prefix)
 * @param dimension - Whether to measure "height" or "width"
 * @param localOnly - Whether to store the variable locally or globally
 * @returns A ref to attach to the component you want to measure
 */
export const useMeasureVariable = <T extends HTMLElement = HTMLDivElement>(
  variableName: string,
  dimension: DimensionType,
  localOnly: boolean = false,
) => {
  const [variable, setVariable] = useState<CSSProperties>({});
  const ref = useRef<T>(null);

  const updateVariable = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const value = dimension === "height" ? rect.height : rect.width;

    if (localOnly) {
      setVariable({ [`--${variableName}`]: `${value}px` });
      return;
    }
    // Store the value with 'px' unit
    VariableService.addVariable(variableName, `${value}px`);
  }, [variableName, dimension]);

  useEffect(() => {
    if (!ref.current) return;

    // Initial measurement
    updateVariable();

    // Set up ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      updateVariable();
    });

    resizeObserver.observe(ref.current);

    // Cleanup function
    return () => {
      resizeObserver.disconnect();
      VariableService.removeVariable(variableName);
    };
  }, [updateVariable, variableName]);

  return { ref, variable };
};
