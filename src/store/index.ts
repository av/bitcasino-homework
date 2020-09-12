import * as tracker from "./cryptoTracker";

// TypeScript compiler fails to process
// export * as cryptoTracker from "./cryptoTracker",
// so using manual re-export
export const cryptoTracker = tracker;
