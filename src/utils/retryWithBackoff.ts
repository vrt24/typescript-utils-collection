/**
 * Retries an async function with exponential backoff.
 * Useful for network requests, API calls, or any unstable async operation.
 *
 * @param fn - The async function to retry
 * @param retries - Number of retry attempts
 * @param delayMs - Initial backoff delay in milliseconds
 * @returns The resolved value of fn()
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 200
): Promise<T> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err: any) {
      const isLastAttempt = attempt === retries;

      if (isLastAttempt) {
        throw new Error(
          `Operation failed after ${retries + 1} attempts: ${err?.message || err}`
        );
      }


      await new Promise((res) => setTimeout(res, delayMs));

      delayMs *= 2;
      attempt++;
    }
  }

  throw new Error("Unexpected retry behavior.");
}
