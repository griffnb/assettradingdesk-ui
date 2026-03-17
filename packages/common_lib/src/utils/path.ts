// Depth limit to prevent infinite recursion
type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

export type DotPath<T, D extends number = 5, K extends keyof T = keyof T> = [
  D,
] extends [never]
  ? never
  : K extends string
    ? T[K] extends object
      ? T[K] extends Date | Array<any> | Function // Don't recurse into these types
        ? K
        : `${K}.${DotPath<T[K], Prev[D]>}` | K
      : K
    : never;

export function setValue<T, P extends DotPath<T>>(
  obj: T,
  path: P,
  value: any,
): void {
  const keys = path.split(".") as (keyof any)[];
  let current: any = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i] as keyof typeof current;

    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {}; // Ensure nested objects exist
    }

    current = current[key];
  }

  const lastKey = keys[keys.length - 1] as keyof typeof current;
  if (lastKey) {
    current[lastKey] = value;
  }
}

export function getValue<T, P extends DotPath<T>>(obj: T, path: P): any {
  const keys = path.split(".") as (keyof any)[];
  let current: any = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as keyof typeof current;

    if (current && key in current) {
      current = current[key];
    } else {
      return undefined; // Return undefined if the path does not exist
    }
  }

  return current;
}
