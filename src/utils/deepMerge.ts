/**
 * Deeply merges two objects without mutating either.
 * Arrays are replaced, not concatenated.
 */
export function deepMerge<T extends object, U extends object>(a: T, b: U): T & U {
  const result: any = { ...a };

  for (const key of Object.keys(b)) {
    const value = (b as any)[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof result[key] === "object"
    ) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
