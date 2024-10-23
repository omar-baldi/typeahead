import { useEffect, useState } from "react";

export const useDebouncedValue = <T>(v: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(v);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(v);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [v, delay]);

  return debouncedValue;
};
