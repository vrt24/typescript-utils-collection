/**
 * Retries a transactional operation with exponential backoff.
 */
export async function retryTransaction<T>(
  operation: () => Promise<T>,
  retries: number = 3
): Promise<T> {
  let attempt = 0;
  let wait = 100;

  while (attempt <= retries) {
    try {
      return await operation();
    } catch (err: any) {
      if (attempt === retries) throw err;

      await new Promise((res) => setTimeout(res, wait));
      wait *= 2;
      attempt++;
    }
  }

  throw new Error("Unexpected flow in retry logic");
}
