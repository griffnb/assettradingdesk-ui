import { DependencyList, useEffect, useState } from "react";

export function useAsyncEffect<T>(
  asyncCallback: () => Promise<T>,
  dependencies: DependencyList,
): T | undefined {
  const [result, setResult] = useState<T | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    const execute = async () => {
      try {
        const data = await asyncCallback();
        if (isMounted) {
          setResult(data);
        }
      } catch (error) {
        console.error(error); // Handle error appropriately
      }
    };

    execute();

    return () => {
      isMounted = false; // Prevent state updates after unmounting
    };
  }, dependencies);

  return result;
}
