/**
 * Animations for an animated list of
 * items, which could enter and exit on demand.
 */
export function animatedList() {
  return {
    initial: {
      opacity: 0,
      y: 0,
      scale: 0.8,
      height: 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      height: "auto",
    },
    exit: {
      opacity: 0,
      y: "-10%",
      scale: 0.8,
      height: 0,
    },
  };
}

/**
 * Animations for a set of screens entering
 * and exiting the viewport one by one.
 */
export function screens() {
  return {
    transition: {
      opacity: {
        duration: 0.2,
      },
      height: {
        duration: 0.3,
      },
    },
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: "auto",
      opacity: 1,
    },
    exit: {
      height: 0,
      opacity: 0,
    },
  };
}

export function typeahead() {
  return {
    transition: {
      opacity: { duration: 0.1 },
      y: { duration: 0.2 },
    },
    initial: {
      y: "10%",
      opacity: 0,
      overflow: "hidden",
    },
    animate: {
      y: 0,
      opacity: 1,
      overflow: "auto",
    },
    exit: {
      y: "10%",
      opacity: 0,
      overflow: "hidden",
    }
  }
}