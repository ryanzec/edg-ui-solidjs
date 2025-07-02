const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const withRetry = async <TReturn>(
  asyncFunction: () => Promise<TReturn>,
  maxAttempts = 1,
  delay = 250,
): Promise<TReturn> => {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const checkResponse = await asyncFunction();

      return checkResponse;
    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts - 1) {
        await sleep(delay);
      }
    }
  }

  throw lastError;
};

export const asyncUtils = { sleep, withRetry };
