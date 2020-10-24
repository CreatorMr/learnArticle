export const safeAwait = promise => {
  return promise.then((res) => [res, null]).catch(err => [null, err]);
};