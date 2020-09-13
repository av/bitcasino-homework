import {
  useState,
  useEffect,
  useCallback,
  useRef,
  MutableRefObject,
} from "react";
import { useDebouncedState } from "./useDebouncedState";

/**
 * Typeahead hook configuration for a
 * basic value with type T
 */
export type TypeahedConfig<T> = {
  /**
   * Query to be passed to typeahead
   * for analysis
   */
  query: string;

  /**
   * Data provider, to fetch possible
   * values based on possible values
   */
  getData: (query: string) => Promise<T[]>;

  /**
   * Should handle the change of suggestion
   * selected by the user
   */
  onChange: (value: T) => void;
};

/**
 * Typeahead hook output to build a controlled state
 * for the component utilising typeahead capabilities.
 */
export type TypeaheadOutput<T> = {
  /**
   * Represents currently selected item in typeahead
   * As soon as User confirms their selection, it'll
   * be passed to onChange handler
   */
  selected: T;

  /**
   * Allows programmatically setting currently selected
   * item, so it's possible to implement embedded selection
   * controls, or make selection based on the external state.
   */
  setSelected: (selected: T) => void;

  /**
   * Convenience helper, selecting the next available item.
   * Returns newly selected item immediately.
   */
  selectNext: () => T;

  /**
   * Convenience helper, selecting the item previous to currently selected.
   * Returns newly selected item immediately.
   */
  selectPrevious: () => void;

  /**
   * Flags that typeahead is currently fetching
   * new results for just passed query
   */
  isLoading: boolean;

  /**
   * Holds the last round of fetched results
   */
  data: T[];

  /**
   * Holds the reference to be passed
   * to an input implementing typeahead capabilities.
   */
  inputRef: MutableRefObject<HTMLInputElement>;

  /**
   * Convenience helper to dynamically
   * modify contents of a controlled input, based on
   * required typeahead logic.
   */
  setInputValue: (value: string) => void;
};

/**
 * A hook, implementing basic typeahead lifecycle
 * around certain data type T
 *
 * Features:
 * - Flags loading state to parent component
 * - Implements a suggestion selection lifecycle
 * - Debounces passed queries to avoid too frequent requests
 */
export function useTypeahead<T>({
  getData,
  query,
  onChange,
}: TypeahedConfig<T>): TypeaheadOutput<T> {
  const inputRef = useRef(null);
  const [selected, setSelectedState] = useState<T>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const debouncedQuery = useDebouncedState(query, 300);

  const setSelected = useCallback(
    (newValue: T) => {
      if (newValue !== selected) {
        setSelectedState(newValue);
        onChange(newValue);
      }
    },
    [onChange, setSelectedState]
  );

  // Parent component can control what's
  // displayed within the controlled input
  // when user performs certain operations with a Typeahead
  const setInputValue = useCallback(
    (value: string) => {
      inputRef.current.value = value;
    },
    [inputRef.current]
  );

  // Selects the next item from current data
  // batch and returns it immediately for state operation
  const selectNext = useCallback(() => {
    const nextIndex = selected ? (data.indexOf(selected) + 1) % data.length : 0;
    const nextItem = data[nextIndex];

    setSelected(nextItem);

    return nextItem;
  }, [selected, data]);

  // Selects item previous to the current one
  // and returns it immediately for state manipulations
  const selectPrevious = useCallback(() => {
    const currentIndex = selected ? data.indexOf(selected) : data.length - 1;
    const previousIndex =
      currentIndex === 0 ? data.length - 1 : currentIndex - 1;
    const previousItem = data[previousIndex];

    setSelected(previousItem);

    return previousItem;
  }, [selected, data]);

  // Detects changes in the debounced queries
  // and launches the basic data fetching pipeline
  useEffect(() => {
    let alive = true;

    if (debouncedQuery) {
      setIsLoading(true);
      setSelected(null);

      getData(debouncedQuery).then((data) => {
        if (!alive) return;

        setData(data);
        setIsLoading(false);
      });
    }

    return () => {
      // If the component was destroyed,
      // allows to gracefully handle results which won't be needed anymore.
      alive = false;
    };
  }, [debouncedQuery]);

  return {
    data,
    isLoading,
    selected,
    setSelected,
    selectNext,
    selectPrevious,
    inputRef,
    setInputValue,
  };
}
