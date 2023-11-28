export const delay = (sec: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, sec);
  });
