import {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
  Ref,
  Component,
  useRef,
  MutableRefObject,
} from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { screens } from "lib/animations";
import { noop } from "lib/utils";

/**
 * A handle to control Screens with a
 * passed ref. Allows setting a screen programmatically.
 */
export type ScreensHandle = {
  setScreen(screen: string): void;
};

/**
 * A screen render prop, given a Screens handle
 * should render the screen contents.
 */
export type Screen = (handle: ScreensHandle) => React.ReactNode;

/**
 * Allows to specify a screen which should be displayed by default
 * and pass a callback for listening a screen change initiation.
 */
export type ScreensProps = {
  /**
   * Defines which of the passed
   * screens will be displayed by default,
   * when it's not explicitly set otherwise.
   */
  defaultScreen?: string;

  /**
   * Will be called as soon as a transition
   * to the new screen starts.
   */
  onScreenChange?(screen: string): void;

  /**
   * Represents screens avaialble for
   * the display. Screens could be either
   * JSX rendering functions or a plain Function Components.
   */
  screens: Record<string, Screen>;

  /**
   * Allows overriding the transition used for screen changes.
   */
  transition?: Transition;
};

const animations = screens();

/**
 * A component, displaying multiple "screens"
 * and allowing programmatically switch between them.
 *
 * Animates transitions between screens using Framer Motion.
 */
function Screens(
  { defaultScreen = "default", onScreenChange = noop, screens, transition }: ScreensProps,
  ref: Ref<ScreensHandle>
) {
  const [currentScreen, setScreen] = useState(defaultScreen);
  const setScreenCallback = useCallback(
    (screen: string) => {
      setScreen(screen);
      onScreenChange(screen);
    },
    [currentScreen, onScreenChange]
  );
  const handle = {
    setScreen: setScreenCallback,
  };

  useImperativeHandle(ref, () => handle, [handle]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="screen-container"
        key={currentScreen}
        transition={transition || animations.transition}
        initial={animations.initial}
        animate={animations.animate}
        exit={animations.exit}
      >
        {screens[currentScreen](handle)}
      </motion.div>
    </AnimatePresence>
  );
}

export default forwardRef(Screens);

/**
 * A convenience helper to obtain a
 * ref to be passed to screens.
 */
export function useScreens(): MutableRefObject<ScreensHandle> {
  return useRef(null);
}
