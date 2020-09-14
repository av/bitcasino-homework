import {
  useState,
  KeyboardEvent,
  useCallback,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { useTypeahead, TypeaheadOutput } from "hooks/useTypeahead";
import { debounce, identity } from "lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import LoadingContent from "./LoadingContent";
import Input from "./Input";
import CenteredSpinner from "./CenteredSpinner";
import * as animations from "lib/animations";

/**
 * Confirgures the Typeahead component instance
 */
export type TypeaheadProps<T> = {
  /**
   * Name to be passed down to the controlled input
   * to embed the typeahead in external forms
   */
  name: string;

  /**
   * Label to be used by the input
   */
  label: string;

  /**
   * Given the current User query,
   * should fetch and return a list of suggestions
   * to be presented
   */
  getData: (query: string) => Promise<T[]>;

  /**
   * Called when the User confirms their suggestion
   * in the Typeahead, receives a stringified "value"
   * of the selected item.
   */
  onChange: (value: string) => void;

  /**
   * Given a suggestion item, returns its
   * identifier to be used as component value
   */
  getItemValue?: (value: T) => string;

  /**
   * Given a suggestion item, returns
   * its displayable name to present back
   * to the User in the controlled input
   */
  getItemName?: (value: T) => string;

  /**
   * Render prop for a single suggestion item
   */
  item?: (item: T) => React.ReactNode;

  /**
   * Render prop for the contents of suggestions
   * dropdown
   */
  content?: (props: TypeaheadContentProps<T>) => React.ReactNode;

  /**
   * Class name to be passed down
   * to the controlled input
   */
  className?: string;

  /**
   * Overrides the controlled input value,
   * so that it's easier to implement a controlled typeahead
   */
  value?: string;
};

/**
 * Props of the custom Typeahead suggestion
 * dropdown content.
 * It receives the full control over the state
 * of typeahead and could implement various interaction scenarios.
 */
export type TypeaheadContentProps<T> = TypeaheadOutput<T> & TypeaheadProps<T>;

const animation = animations.typeahead();

/**
 * An abstract Typeahead component focused on async
 * suggestion flows.
 *
 * Features:
 * - Typed for the expected data
 * - Could be embedded into external forms
 * - Handles debouncing of queries
 * - Handles basic keyboard and pointer selection
 */
export function Typeahead<T>(props: TypeaheadProps<T>) {
  const {
    getData,
    onChange,
    name,
    label,
    content = (props) => <DefaultTypeaheadContent {...props} />,
    getItemValue = identity,
    getItemName = identity,
    className,
    value,
  } = props;
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const typeahead = useTypeahead<T>({
    getData,
    query,
    onChange: (item) => {
      if (item) {
        onChange(getItemValue(item));
        setInputValue(getItemName(item));
      } else {
        onChange("");
      }
    },
  });
  const { selectNext, selectPrevious, setInputValue, inputRef } = typeahead;

  // Defines whether the suggestion dropdown will be visible
  const isOpen = query && isFocused;

  // Handles the keydown events in a controlled
  // input by moving item selection or confirming
  // the chosen item as component value
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!isFocused) return;

      if (e.keyCode === 40) {
        selectNext();
      }

      if (e.keyCode === 38) {
        selectPrevious();
      }

      if (e.keyCode === 13 || e.keyCode === 27) {
        setIsFocused(false);
        e.stopPropagation();
      }
    },
    [selectNext, selectPrevious, isFocused, setInputValue]
  );

  // Handles incoming inputs for suggestions query
  const handleInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      setQuery(target.value);
      setIsFocused(true);
    },
    [setQuery, setIsFocused]
  );

  // Synthetic focus/blur pipeline
  // Used mainly for controlling the dropdown state
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleBlur = useCallback(
    // Debounced synthetic blur,
    debounce(() => setIsFocused(false), 100),
    [setIsFocused]
  );

  return (
    <>
      <Input
        required
        ref={inputRef}
        label={label}
        name={name}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={className}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            transition={animation.transition}
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            style={{
              position: "absolute",
              background: "whitesmoke",
              padding: "1rem",
              borderRadius: "1rem",
              maxHeight: '50vh',
              overflow: 'auto',
              boxShadow: "0 1rem 2rem 0 rgba(0, 0, 0, .2)",
            }}
          >
            {content({ ...typeahead, ...props })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * A default content block for Typeahead component,
 * displays basic loading state while suggestions
 * are being fetched and allows direct selection of
 * the fetched items.
 */
export function DefaultTypeaheadContent<T>({
  isLoading,
  data,
  getItemValue,
  setSelected,
  selected,
  item = (item) => <span>{item}</span>,
}: TypeaheadContentProps<T>) {
  return (
    <LoadingContent
      isLoading={isLoading}
      loading={() => <CenteredSpinner />}
      content={() =>
        data.map((dataItem) => (
          <motion.div
            key={getItemValue(dataItem)}
            onPointerDown={() => setSelected(dataItem)}
            style={{
              borderRadius: ".5rem",
              background:
                dataItem === selected ? "rgba(0, 0, 0, .05)" : "transparent",
            }}
          >
            {item(dataItem)}
          </motion.div>
        ))
      }
    />
  );
}
