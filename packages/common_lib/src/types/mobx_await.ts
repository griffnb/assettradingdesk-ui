// use this inside of a yield* $yieldAwait(myfunction())
export function* $yieldAwait<T>(p: Promise<T>): Generator<Promise<T>, T, T> {
  const v: T = yield p;
  return v;
}
