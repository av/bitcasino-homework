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
