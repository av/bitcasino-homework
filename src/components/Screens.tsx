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
import { motion, AnimatePresence } from "framer-motion";
import { screens } from "lib/animations";

export type ScreensHandle = {
  setScreen(screen: string): void;
};

export type Screen = {
  (handle: ScreensHandle): Component;
};

export type ScreensProps = {
  defaultScreen?: string;
  onScreenChange?(screen: string): void;
  screens: { [key: string]: Screen };
};

const animations = screens();
const noopScreenChange = (screen: string) => {};

function Screens(
  {
    defaultScreen = "default",
    onScreenChange = noopScreenChange,
    screens,
  }: ScreensProps,
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

  console.log("SCREENS RENDER", currentScreen);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="screen-container"
        key={currentScreen}
        transition={animations.transition}
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

export function useScreens(): MutableRefObject<ScreensHandle> {
  return useRef(null);
}
