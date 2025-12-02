/**
 * Memoizes an async function to avoid redundant calls with the same key.
 */
export function memoizeAsync<T, K>(
  fn: (key: K) => Promise<T>
): (key: K) => Promise<T> {
  const cache = new Map<K, Promise<T>>();

  return async (key: K): Promise<T> => {
    if (!cache.has(key)) {
      cache.set(key, fn(key));
    }
    return cache.get(key)!;
  };
}
