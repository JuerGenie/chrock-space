interface WaitPromise extends Promise<void> {
  cancle(): void;
}

export function wait(delay: number): Promise<void> {
  let cancle: () => void;

  const result = new Promise((resolve, reject) => {
    const handler = setTimeout(
      () => resolve(void 0),
      delay
    ) as unknown as number;
    cancle = () => {
      clearTimeout(handler);
      reject("cancle");
    };
  }) as WaitPromise;

  result.cancle = cancle;

  return result;
}
