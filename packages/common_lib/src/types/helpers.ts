/** Lovingly ripped off from this stack overflow post
 *
 * https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object/58436959#58436959
 */

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | (Paths<T[K], Prev[D]> extends infer R ? Join<K, R> : never)
          : never;
      }[keyof T]
    : "";

export type KeysWithValsOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P;
};

export type Key = string | number | symbol;

export type URLParams = { [key: string]: string | string[] };

export type NoLeadingSlash<T extends string> = T extends `/${string}`
  ? "Path must not start with a leading slash ('/')."
  : T;
