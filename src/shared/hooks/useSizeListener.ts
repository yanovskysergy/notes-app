import { useEffect, useState } from "react";

export const useSizeListener = (ref: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const handler = () => {
        setSize({ width: element.clientWidth, height: element.clientHeight });
      };
      handler();
      const observer = new ResizeObserver(handler);
      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);

  return size;
};
