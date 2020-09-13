import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import * as animations from "lib/animations";
import { identity } from "lib/utils";

const animation = animations.animatedList();

/**
 * Basic animated list, items enter and exit
 * with animation, their siblings respond accordingly
 */
export default function AnimatedList({ children = [], getKey = identity }) {
  return (
    <AnimatePresence>
      {React.Children.map(children, (item, i) => (
        <motion.div
          key={getKey(item)}
          positionTransition
          variants={animation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {item}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
