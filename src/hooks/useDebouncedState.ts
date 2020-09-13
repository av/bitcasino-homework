import { useState, useEffect } from "react";

/**
 * Debounces updates for a given value so that
 * it happens at most once per given delay,
 * regardless of how many actual updates the value got.
 * 
 * @param value - value to debounce
 * @param delay - threshold for debouncing
 */
export function useDebouncedState<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
