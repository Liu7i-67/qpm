export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err as any, errorExt);
      }

      return [err, undefined];
    });
}
